const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { v4: uuidv4 } = require("uuid"); // for transaction refs
const paypal = require("@paypal/checkout-server-sdk");
const { client } = require("../config/paypal");

// @desc   Make a payment
// @route  POST /api/payments
exports.makePayment = async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;

    if (!userId || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, error: "All fields required" });
    }

    // Deduct from wallet if paymentMethod is "wallet"
    if (paymentMethod === "wallet") {
      let wallet = await Wallet.findOne({ userId });
      if (!wallet || wallet.balance < amount) {
        return res.status(400).json({ success: false, error: "Insufficient wallet balance" });
      }

      wallet.balance -= amount;
      await wallet.save();
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      amount,
      paymentMethod,
      type: "debit",
      reference: uuidv4(),
    });

    res.status(201).json({
      success: true,
      message: "Payment successful",
      data: transaction,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc   Get wallet balance
// @route  GET /api/wallet/:userId
exports.getWalletBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) {
      return res.status(404).json({ success: false, error: "Wallet not found" });
    }
    res.status(200).json({ success: true, balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc   Book & Pay with PayPal (Stub)
// @route  POST /api/payments/paypal
exports.bookAndPayWithPaypal = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    // 👉 Later: integrate PayPal SDK here
    const transaction = await Transaction.create({
      userId,
      amount,
      paymentMethod: "paypal",
      type: "debit",
      reference: uuidv4(),
      status: "completed",
    });

    res.status(201).json({
      success: true,
      message: "Booking and PayPal payment successful",
      data: transaction,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc   View transaction history
// @route  GET /api/transactions/:userId
exports.getTransactionHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: transactions.length, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


// @desc   Book & Pay with PayPal
// @route  POST /api/payments/paypal
exports.bookAndPayWithPaypal = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ success: false, error: "userId and amount required" });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: uuidv4(),
          amount: {
            currency_code: "USD", // ⚠️ Change if needed
            value: amount.toString(),
          },
        },
      ],
    });

    const order = await client().execute(request);

    res.status(201).json({
      success: true,
      message: "PayPal order created successfully",
      data: order.result,
    });
  } catch (err) {
    console.error("PayPal Error:", err);
    res.status(500).json({ success: false, error: "PayPal Error" });
  }
};

// @desc   Capture PayPal Payment
// @route  POST /api/payments/paypal/capture/:orderId
exports.capturePaypalPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { userId, amount } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client().execute(request);

    // Save transaction
    const transaction = await Transaction.create({
      userId,
      amount,
      paymentMethod: "paypal",
      type: "debit",
      reference: orderId,
      status: "completed",
    });

    res.status(200).json({
      success: true,
      message: "PayPal payment captured successfully",
      data: capture.result,
      transaction,
    });
  } catch (err) {
    console.error("Capture Error:", err);
    res.status(500).json({ success: false, error: "Capture failed" });
  }
};