require("dotenv").config();
const connectDB = require("./config/db");

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());
const locationRoutes = require("./routes/locationRoutes");
app.use("/api/location", locationRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Backend de localisation opérationnel 🚀");
});

io.on("connection", (socket) => {
  console.log("Nouvel utilisateur connecté :", socket.id);

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté :", socket.id);
  });
});

const PORT = process.env.Port || 5000;
connectDB();
server.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});