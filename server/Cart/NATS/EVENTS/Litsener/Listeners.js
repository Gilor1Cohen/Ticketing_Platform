const {
  OrdersCreated,
  TicketsDelete,
  TicketsUpdated,
  TicketReleased,
  DeleteProfile,
} = require("../../../business-logic-layer/EventsBL");
const { getJs } = require("../../NATSconfig");
const { JSONCodec } = require("nats");

async function Listeners(streamName, durableName) {
  const jc = JSONCodec();

  const js = getJs();

  const consumer = await js.consumers.get(streamName, durableName);

  const iter = await consumer.consume();

  console.log(`[NATS] Orders listener started: ${durableName}`);

  for await (const m of iter) {
    try {
      const subject = m.subject;
      const data = m.json();

      switch (subject) {
        case "Orders.Created": {
          await OrdersCreated(data.UserId);
          m.ack();
          break;
        }

        case "Tickets.Delete": {
          await TicketsDelete(data.UserId, data.TicketId);
          m.ack();
          break;
        }

        case "Tickets.Updated": {
          const { UserId, TicketId, Title, Price, Date, Type } = data;

          await TicketsUpdated(UserId, TicketId, Title, Price, Date, Type);
          m.ack();
          break;
        }

        case "Tickets.TicketReleased": {
          await TicketReleased(data.TicketId);
          m.ack();
          break;
        }

        case "Auth.DeleteProfile": {
          await DeleteProfile(data.UserId);
          m.ack();
          break;
        }

        default:
          console.log(`[NATS] No handler for subject: ${subject}`);
          m.ack();
          break;
      }
    } catch (err) {
      m.nak();
      console.error("[NATS] Orders handler error:", err?.message || err);
    }
  }
}

module.exports = { Listeners };
