const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send SMS via Twilio
 * @param {string} to - Recipient phone number (E.164 format e.g. +2348012345678)
 * @param {string} body - SMS message content
 */
const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio purchased number
      to,
    });

    console.log(`📲 SMS sent to ${to}: SID ${message.sid}`);
    return message;
  } catch (error) {
    console.error("Twilio SMS Error:", error);
    throw new Error("SMS could not be sent");
  }
};

module.exports = sendSMS;
