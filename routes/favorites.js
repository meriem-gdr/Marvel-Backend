const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/favorites/character", isAuthenticated, async (req, res) => {
  try {
    const { user } = req;
    const { characterId } = req.body;

    if (!characterId) {
      return res.status(400).json({ message: "Missing characterId" });
    }

    const existingFavorite = user.account.characters.includes(characterId);

    if (existingFavorite) {
      user.account.characters = user.account.characters.filter(
        (existingCharacterId) => existingCharacterId !== characterId
      );
    } else {
      user.account.characters = [...user.account.characters, characterId];
    }

    await user.save();

    return res.status(200).json({
      id: characterId,
      isFavorite: !existingFavorite,
      message: `CharacterId : ${characterId} ${
        existingFavorite ? "removed from" : "added to"
      } favorites`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/favorites/comic", isAuthenticated, async (req, res) => {
  try {
    const { user } = req;
    const { comicId } = req.body;

    if (!comicId) {
      return res.status(400).json({ message: "Missing comicId" });
    }

    const existingFavorite = user.account.comics.includes(comicId);

    if (existingFavorite) {
      user.account.comics = user.account.comics.filter(
        (existingComicId) => existingComicId !== comicId
      );
    } else {
      user.account.comics = [...user.account.comics, comicId];
    }

    await user.save();

    return res.status(200).json({
      id: comicId,
      isFavorite: !existingFavorite,
      message: `ComicId : ${comicId} ${
        existingFavorite ? "removed from" : "added to"
      } favorites`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
