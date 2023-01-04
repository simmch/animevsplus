const express = require("express");
const router = express.Router();
const request = require("request");
const God = require("../models/gods")

// @route   GET pcg/gods/
// @desc    Get all gods
// @access  Public
router.get("/", async (req, res) => {

    try {
        const gods = await God.find({})
        res.json(gods);
        if (!gods) {
            return res
                .status(400)
                .json({ msg: "No gods were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET pcg/gods/$GAME
// @desc    Get Gods by game
// @access  Public
router.get("/:game", async (req, res) => {

    try {
        const gods = await God.findOne({ 'GAME' : req.params.game });
        res.json(gods);
        if (!gods) {
            return res
                .status(400)
                .json({ msg: "No gods were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET pcg/gods/$TITLE
// @desc    Get Gods by title
// @access  Public
router.get("/:title", async (req, res) => {

    try {
        const gods = await God.findOne({ 'TITLE' : req.params.title });
        res.json(gods);
        if (!gods) {
            return res
                .status(400)
                .json({ msg: "No gods were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET pcg/gods/$WINNER
// @desc    Get Gods by winner
// @access  Public
router.get("/:winner", async (req, res) => {

    try {
        const gods = await God.findOne({ 'WINNER' : req.params.winner });
        res.json(gods);
        if (!gods) {
            return res
                .status(400)
                .json({ msg: "No gods were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})



// @route   POST pcg/gods/new
// @desc    Create new Gods
// @access  Public
router.post("/new", async (req, res) => {

    const {
        TITLE,
        GAME,
        TYPE,
        IMG_URL,
        REWARD,
        ARCHIVED,
        TEAM_FLAG,
        AVAILABLE,
        REGISTRATION,
        PARTICIPANTS,
        WINNER,
        TIMESTAMP
    } = req.body
    const godFields = {...req.body}

    try {
        let god = await God.findOne({ TITLE: TITLE })
        if (god) {
            res.send("Gods already exist. ")
            return
        }

        god = new God(godFields)
        response = await god.save()
        res.status(200).send("God added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST pcg/gods/update
// @desc    Update Game info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        TITLE,
        GAME,
        TYPE,
        IMG_URL,
        REWARD,
        ARCHIVED,
        TEAM_FLAG,
        AVAILABLE,
        REGISTRATION,
        PARTICIPANTS,
        WINNER,
        TIMESTAMP
    } = req.body
    const godFields = {...req.body}

    try {
        await God.updateOne({ TITLE: TITLE }, godFields)
        res.status(200).send("God successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE pcg/gods/delete
// @desc    Delete a Game
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await God.findOneAndRemove({TITLE: req.body.TITLE})
        res.status(200).send("God successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router