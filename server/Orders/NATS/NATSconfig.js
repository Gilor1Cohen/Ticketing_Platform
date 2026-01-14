const { connect } = require("nats");

let nc;
let js;
let jsm;

async function connectNats() {
  try {
    nc = await connect({
      servers: "nats://127.0.0.1:5222",
      name: "Orders-Service",
    });

    console.log("[NATS] connected on port 5222");

    js = nc.jetstream();
    jsm = await nc.jetstreamManager();
  } catch (error) {
    console.error("[NATS] start error:", error);
    process.exit(1);
  }
}

async function ensureStream(jsm) {
  const streamName = "EVENTS_STREAM";
  const subjects = ["Tickets.>", "Orders.>", "Cart.>", "Auth.>"];

  try {
    await jsm.streams.info(streamName);
    return;
  } catch (err) {}

  await jsm.streams.add({
    name: streamName,
    subjects,
    storage: "file",
    retention: "limits",
  });
}

function getNc() {
  if (!nc)
    throw new Error(
      "NATS connection is not ready yet. Call connectNats() first."
    );
  return nc;
}

function getJs() {
  if (!js)
    throw new Error("JetStream is not ready yet. Call connectNats() first.");
  return js;
}

function getJsm() {
  if (!jsm)
    throw new Error("JetStream is not ready yet. Call connectNats() first.");
  return jsm;
}
module.exports = { connectNats, getNc, getJs, getJsm, ensureStream };
