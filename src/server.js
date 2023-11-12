const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanets } = require("./models/planets.model");

const PORT = process.env.PORT || 5000;
const MONGO_URL =
  "mongodb+srv://abdelslamel5oly:nwWU5GVf0IGdUjXQ@cluster0.cyupft2.mongodb.net/Nasa?retryWrites=true&w=majority";

const server = http.createServer(app);
const startServer = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((error) => console.log("There was an error: ", error));

  await loadPlanets();
  server.listen(PORT, () => console.log(`app Is working on port ${PORT}`));
};

startServer();
