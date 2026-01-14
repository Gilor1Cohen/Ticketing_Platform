const { AckPolicy } = require("nats");
const { getJsm } = require("../NATSconfig");

async function ensureConsumer(streamName, durableName) {
  const jsm = getJsm();

  try {
    await jsm.consumers.info(streamName, durableName);
    return;
  } catch (error) {}

  await jsm.consumers.add(streamName, {
    durable_name: durableName,
    ack_policy: AckPolicy.Explicit,
    deliver_policy: "new",
  });

  console.log("[NATS] Consumer ensured:", durableName);
}

module.exports = { ensureConsumer };
