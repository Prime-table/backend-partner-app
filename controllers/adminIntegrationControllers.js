const AdminSettings = require("../models/adminSettingSchema");

// @desc Get integration settings
// @route GET /prime-table-admin/settings/integration
const getIntegrationSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();

    if (!settings) {
      settings = await AdminSettings.create({});
    }

    res.json(settings.integration);
  } catch (error) {
    res.status(500).json({ message: "Error fetching integration settings", error });
  }
};

// @desc Update integration settings
// @route PUT /prime-table-admin/settings/integration
const updateIntegrationSettings = async (req, res) => {
  try {
    const { paymentGateway, emailService, smsProvider } = req.body;

    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }

    settings.integration.paymentGateway = paymentGateway || settings.integration.paymentGateway;
    settings.integration.emailService = emailService || settings.integration.emailService;
    settings.integration.smsProvider = smsProvider || settings.integration.smsProvider;

    await settings.save();

    res.json({ message: "Integration settings updated successfully", integration: settings.integration });
  } catch (error) {
    res.status(500).json({ message: "Error updating integration settings", error });
  }
};


// @desc Add new API key
// @route POST /prime-table-admin/settings/integration/api-keys
const addApiKey = async (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ message: "API key is required" });

    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create({});
    }

    settings.integration.apiKeys.push({ key });
    await settings.save();

    res.json({ message: "API key added successfully", apiKeys: settings.integration.apiKeys });
  } catch (error) {
    res.status(500).json({ message: "Error adding API key", error });
  }
};

const getApiKeys = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();

    // if settings doesn’t exist, create default container
    if (!settings) {
      settings = await AdminSettings.create({});
    }

    res.json({ apiKeys: settings.integration.apiKeys });
  } catch (error) {
    res.status(500).json({ message: "Error fetching API keys", error });
  }
};

// @desc Update API key status (active/inactive)
// @route PATCH /prime-table-admin/settings/integration/api-keys/:id
const updateApiKeyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    let settings = await AdminSettings.findOne();
    if (!settings) return res.status(404).json({ message: "Settings not found" });

    const apiKey = settings.integration.apiKeys.id(id);
    if (!apiKey) return res.status(404).json({ message: "API key not found" });

    apiKey.status = status || apiKey.status;
    await settings.save();

    res.json({ message: "API key status updated", apiKeys: settings.integration.apiKeys });
  } catch (error) {
    res.status(500).json({ message: "Error updating API key status", error });
  }
};

// @desc Delete API key
// @route DELETE /prime-table-admin/settings/integration/api-keys/:id
const deleteApiKey = async (req, res) => {
  try {
    const { id } = req.params;

    let settings = await AdminSettings.findOne();
    if (!settings) return res.status(404).json({ message: "Settings not found" });

    settings.integration.apiKeys = settings.integration.apiKeys.filter(
      (apiKey) => apiKey._id.toString() !== id
    );

    await settings.save();

    res.json({ message: "API key deleted", apiKeys: settings.integration.apiKeys });
  } catch (error) {
    res.status(500).json({ message: "Error deleting API key", error });
  }
};

module.exports = {
  getIntegrationSettings,
  updateIntegrationSettings,
  addApiKey,
  getApiKeys,
  updateApiKeyStatus,
  deleteApiKey,
};
