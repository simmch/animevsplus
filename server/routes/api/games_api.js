const express = require("express");
const router = express.Router();
const request = require("request");
const Game = require("../models/games")

// @route   GET pcg/games/
// @desc    Get all games
// @access  Public
router.get("/", async (req, res) => {

    try {
        const games = await Game.find({})
        res.json(games);
        if (!games) {
            return res
                .status(400)
                .json({ msg: "No games were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET pcg/games/$GAME
// @desc    Get Game by name
// @access  Public
router.get("/:game", async (req, res) => {

    try {
        const games = await Game.findOne({ 'GAMES' : req.params.game });
        res.json(games);
        if (!games) {
            return res
                .status(400)
                .json({ msg: "No games were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST pcg/games/new
// @desc    Create new Game
// @access  Public
router.post("/new", async (req, res) => {

    const {
        GAME,
        IMAGE_URL,
        TYPE,
        IGN,
        ALIASES,
        TIMESTAMP
    } = req.body
    const gameFields = {...req.body}

    try {
        let game = await Game.findOne({ GAME: GAME })
        if (game) {
            res.send("Game already exist. ")
            return
        }

        game = new Game(gameFields)
        response = await game.save()
        res.status(200).send("Game added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST pcg/games/update
// @desc    Update Game info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        GAME,
        IMAGE_URL,
        TYPE,
        IGN,
        ALIASES,
        TIMESTAMP
    } = req.body
    const gameFields = {...req.body}

    try {
        await Game.updateOne({ GAME: GAME }, gameFields)
        res.status(200).send("Game successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE pcg/games/delete
// @desc    Delete a Game
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Game.findOneAndRemove({GAME: req.body.GAME})
        res.status(200).send("Game successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router