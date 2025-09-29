const Partner = require("../models/latestPartnersSchema");

// @desc Get all partners
const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get single partner
const getPartner = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Create new partner
const createPartner = async (req, res) => {
  try {
    const { fullName, email, regDate, status } = req.body;
    const partner = await Partner.create({ fullName, email, regDate, status });
    res.status(201).json(partner);
  } catch (err) {
    res.status(400).json({ message: "Error creating partner", error: err.message });
  }
};

// @desc Update partner
const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json({ message: "Error updating partner", error: err.message });
  }
};

// @desc Delete partner
const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: "Partner not found" });
    res.status(200).json({ message: "Partner deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getPartners,
  getPartner,
  createPartner,
  updatePartner,
  deletePartner,
};
