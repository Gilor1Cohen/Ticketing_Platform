const { getJs, getJsm } = require("../../NATSconfig");
const { JSONCodec } = require("nats");

async function publishEvent(subject, data) {
  const js = getJs();
  const jsm = getJsm();
  const jc = JSONCodec();

  try {
    const s = await jsm.streams.info("EVENTS_STREAM");
    console.log("[NATS] EVENTS_STREAM subjects:", s.config.subjects);
    const ack = await js.publish(subject, jc.encode(data));
    return ack;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  publishEvent,
};
