import express from "express";
import locationRoutes from "./routes/locationRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/location", locationRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from ISS",
  });
});

const startServer = async () => {
  try {
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
