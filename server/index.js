const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const locationRoutes = require("./routes/routes.js");
const servicesManager = require("./services/services-manager.js");
const API_SERVER_PORT = 8080;
const WS_SERVER_PORT = 3000;
const delay = 5000;

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ port: WS_SERVER_PORT });

app.use(express.json());

app.use("/api", locationRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from ISS",
  });
});

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(
    JSON.stringify({
      message: "Welcome to WebSocket Server",
    })
  );

  setInterval(async () => {
    const issLocation = await servicesManager.getIssCountry();

    ws.send(
      JSON.stringify({
        message: "ISS location update",
        ...issLocation,
      })
    );
  }, delay);
});

const startServer = async () => {
  try {
    server.listen(API_SERVER_PORT, () =>
      console.log(`Server started on ${API_SERVER_PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
