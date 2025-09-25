const express = require("express");
const adminIntegrationControllers = require("../controllers/adminIntegrationControllers");

const router = express.Router();

router.get("/", adminIntegrationControllers.getIntegrationSettings);
router.put("/", adminIntegrationControllers.updateIntegrationSettings);

router.post("/add-api-keys", adminIntegrationControllers.addApiKey);
router.get("/get-api-keys", adminIntegrationControllers.getApiKeys);
router.patch("/api-keys/:id", adminIntegrationControllers.updateApiKeyStatus);
router.delete("/api-keys/:id", adminIntegrationControllers.deleteApiKey);

module.exports = router;
