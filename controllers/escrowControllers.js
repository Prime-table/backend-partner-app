const Escrow = require("../models/escrowScema");

// Get all escrows
const getEscrows = async (req, res) => {
  try {
    const escrows = await Escrow.find().sort({ createdAt: -1 });
    res.json(escrows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching escrows", error });
  }
};

// Create a new escrow
const createEscrow = async (req, res) => {
  try {
    const escrow = new Escrow(req.body);
    await escrow.save();
    res.status(201).json(escrow);
  } catch (error) {
    res.status(400).json({ message: "Error creating escrow", error });
  }
};

// Approve escrow (status → approved)
const approveEscrow = async (req, res) => {
  try {
    const { id } = req.params;
    const escrow = await Escrow.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.json({ escrow });
  } catch (error) {
    res.status(400).json({ message: "Error approving escrow", error });
  }
};

// Reject escrow (status → rejected)
const rejectEscrow = async (req, res) => {
  try {
    const { id } = req.params;
    const escrow = await Escrow.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.json({ escrow });
  } catch (error) {
    res.status(400).json({ message: "Error rejecting escrow", error });
  }
};

// General status update (if needed)
const updateEscrowStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const escrow = await Escrow.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.json(escrow);
  } catch (error) {
    res.status(400).json({ message: "Error updating escrow", error });
  }
};

// Delete escrow
const deleteEscrow = async (req, res) => {
  try {
    const { id } = req.params;
    const escrow = await Escrow.findByIdAndDelete(id);
    if (!escrow) return res.status(404).json({ message: "Escrow not found" });
    res.json({ message: "Escrow deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting escrow", error });
  }
};

module.exports = {
  getEscrows,
  createEscrow,
  approveEscrow,
  rejectEscrow,
  updateEscrowStatus,
  deleteEscrow,
};
