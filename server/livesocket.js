// Module that starts websocket & http server for api use

const app = require('./app') ({
  broadcastUpdateOrder,
  broadcastUpdateDriver,
  broadcastUpdateList
});
const server = require("http").Server(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

const { PORT } = process.env;

wss.on("connection", socket => {
  socket.onmessage = event => {
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
          key: 'orders'
        })
      );
    }
  })
}

function broadcastUpdateDriver (drivers = [], type = 'create') {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type,
          drivers,
          key: 'drivers'
        })
      );
    }
  })
}
function broadcastUpdateList (list = [], type = 'create', key = 'suppliers') {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type,
          list,
          key
        })
      );
    }
  })
}

module.exports = {
  broadcastUpdateOrder,
  broadcastUpdateDriver,
  broadcastUpdateList
}