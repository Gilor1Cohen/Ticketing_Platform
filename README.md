# Ticketing Platform (Microservices)

### React + Node.js + MongoDB + NATS JetStream

A microservices-based ticketing platform built with **React** and **Node.js/Express** and **MongoDB**, using **NATS JetStream** for event-driven communication between services.

### Services

- **Auth Service** - Authentication, profile lifecycle (e.g., delete profile)
- **Tickets Service** - Ticket CRUD, availability/locking logic
- **Orders Service** - Order creation and order lifecycle
- **Cart Service** - User cart management (add/remove tickets)

Each service follows a layered architecture:

- `controller-layer/`
- `business-logic-layer/`
- `data-access-layer/`

### Event Bus

Inter-service communication is implemented with **NATS JetStream**.

Example stream:

- `EVENTS_STREAM`

Example subjects used across services:

- `Tickets.>`
- `Orders.>`
- `Cart.>`
- `Auth.>`

### Example Events

Adjust these to match your implementation:

- `Tickets.Updated`
- `Tickets.Deleted`
- `Orders.Created`
- `Cart.AddedToCart`
- `Cart.RemovedFromCart`
- `Auth.DeleteProfile`

### Run NATS JetStream (Docker)

This runs NATS with JetStream enabled and maps **NATS client port to 5222** on your machine:

```bash
docker run -d --name nats-js   -p 5222:4222   -p 8222:8222   nats:latest -js
```

### Environment Variables

Create a `.env` file per service.

Example:

```env
JWT_SECRET=replace_me
```

### Install Dependencies

Install dependencies inside each service folder:

```bash
cd server/Auth && npm install
cd ../Tickets && npm install
cd ../Orders && npm install
cd ../Cart && npm install
```

### Run Services (Development)

Start **NATS** first, then run each service (typically with nodemon):

```bash
cd server/Auth && nodemon index
cd server/Tickets && nodemon index
cd server/Orders && nodemon index
cd server/Cart && nodemon index
```
