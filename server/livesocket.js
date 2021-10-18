const app = require('./app') ({broadcastUpdateOrder});
const server = require("http").Server(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

const { PORT } = process.env;

wss.on("connection", socket => {
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});
// Port and listen 

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
function broadcastUpdateOrder (orders = [], type = 'create') {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type,
          orders,
        })
      );
    }
  })
}

module.exports = {
  broadcastUpdateOrder
}