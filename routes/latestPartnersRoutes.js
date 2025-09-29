const express = require("express");
const router = express.Router();
const latestPartnersControllers = require("../controllers/latestPartnersControllers");

// GET all partners / POST new partner
router.route("/")
  .get(latestPartnersControllers.getPartners)
  .post(latestPartnersControllers.createPartner);

// GET single / UPDATE / DELETE
router.route("/:id")
  .get(latestPartnersControllers.getPartner)
  .put(latestPartnersControllers.updatePartner)
  .delete(latestPartnersControllers.deletePartner);

module.exports = router;
