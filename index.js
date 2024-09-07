const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const charactersRoutes = require("./routes/characters");
const comicsRoutes = require("./routes/comics");
const userRoute = require("./routes/user");
const favoritesRoute = require("./routes/favorites");

app.use(charactersRoutes);
app.use(comicsRoutes);
app.use(userRoute);
app.use(favoritesRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Sorry, page not found!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
