const express = require("express");
const router = express.Router();

const axios = require("axios");
require("dotenv").config();

const getUser = require("../middlewares/getUser");

router.get("/comics", getUser, async (req, res) => {
  try {
    const { title, page = 1 } = req.query;
    const limit = 100;
    const skip = (page - 1) * limit;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics`,
      {
        params: {
          title,
          limit,
          skip,
          apiKey: process.env.MARVEL_PRIVATE_KEY,
        },
      }
    );
    const favoriteComics = req.user ? req.user.account.comics : [];

    // add isFavorite in each result
    const data = {
      ...response.data,
      results: response.data.results.map((result) => {
        const isFavorite = favoriteComics.includes(result._id);

        return { ...result, isFavorite };
      }),
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comics" });
  }
});

router.get("/comics/:characterId", getUser, async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}`,
      {
        params: {
          apiKey: process.env.MARVEL_PRIVATE_KEY,
        },
      }
    );

    const favoriteComics = req.user ? req.user.account.comics : [];

    // add isFavorite in each result
    const data = {
      ...response.data,
      comics: response.data.comics.map((comic) => {
        const isFavorite = favoriteComics.includes(comic._id);

        return { ...comic, isFavorite };
      }),
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
