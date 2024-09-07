const express = require("express");
const router = express.Router();

const axios = require("axios");
require("dotenv").config();

const getUser = require("../middlewares/getUser");

router.get("/characters", getUser, async (req, res) => {
  try {
    const { name, page = 1 } = req.query;
    const limit = 100;
    const skip = (page - 1) * limit;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters`,
      {
        params: {
          name,
          limit,
          skip,
          apiKey: process.env.MARVEL_PRIVATE_KEY,
        },
      }
    );

    const favoriteCharacters = req.user ? req.user.account.characters : [];

    // add isFavorite in each result
    const data = {
      ...response.data,
      results: response.data.results.map((result) => {
        const isFavorite = favoriteCharacters.includes(result._id);

        return { ...result, isFavorite };
      }),
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

module.exports = router;
