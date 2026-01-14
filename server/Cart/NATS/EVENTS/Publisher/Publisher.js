const { getJs } = require("../../NATSconfig");
const { JSONCodec } = require("nats");

async function publishEvent(subject, data) {
  const js = getJs();
  const jc = JSONCodec();

  const ack = await js.publish(subject, jc.encode(data));

  return ack;
}

module.exports = {
  publishEvent,
};
