const express = require("express");
const router = express.Router();
const escrowControllers = require("../controllers/escrowControllers");

// GET all escrows
router.get("/", escrowControllers.getEscrows);

// POST create escrow
router.post("/", escrowControllers.createEscrow);

// PUT update escrow status (general)
router.put("/:id", escrowControllers.updateEscrowStatus);

// PUT approve escrow (release funds)
router.put("/:id/release", escrowControllers.approveEscrow);

// PUT reject escrow (cancel)
router.put("/:id/cancel", escrowControllers.rejectEscrow);

// DELETE escrow
router.delete("/:id", escrowControllers.deleteEscrow);

module.exports = router;
