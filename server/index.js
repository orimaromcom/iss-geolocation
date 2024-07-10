const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const locationRoutes = require("./routes/routes.js");
const servicesManager = require("./services/services-manager.js");
const PORT = 8080;
const DELAY = 5000;

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.use(express.json());

app.use("/api/v1", locationRoutes);

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
  let intervalId = setInterval(async () => {
    const issLocation = await servicesManager.getIssCountry();

    ws.send(
      JSON.stringify({
        message: "ISS location update",
        ...issLocation,
      })
    );
  }, DELAY);

  ws.onclose = () => {
    console.log("WebSocket connection closed");
    clearInterval(intervalId);
  };
});

const startServer = async () => {
  try {
    server.listen(PORT, () => console.log(`Server started on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
