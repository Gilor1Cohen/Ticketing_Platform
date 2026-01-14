const { ensureConsumer } = require("./ensureConsumer");
const { Listeners } = require("./Litsener/Listeners");

async function startListeners(streamName, durableName) {
  try {
    await ensureConsumer(streamName, durableName);
    await Listeners(streamName, durableName);
  } catch (error) {
    console.error("[NATS] startListeners error:", error);
    throw error;
  }
}

module.exports = { startListeners };
