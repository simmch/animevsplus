const express = require("express");
const router = express.Router();
const request = require("request");
const Matches = require("../models/matches")

// @route   GET crown/matches/
// @desc    Get all matches
// @access  Public
router.get("/", async (req, res) => {

    try {
        const matches = await Matches.find({})
        res.json(matches);
        if (!matches) {
            return res
                .status(400)
                .json({ msg: "No matches were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/matches/$card
// @desc    Get matches by name
// @access  Public
router.get("/:card", async (req, res) => {

    try {
        const matches = await Matches.findOne({ 'CARD' : req.params.card });
        res.json(matches);
        if (!matches) {
            return res
                .status(400)
                .json({ msg: "No matches were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/matches/new
// @desc    Create new match
// @access  Public
router.post("/new", async (req, res) => {

    const {
        PLAYER,
        CARD,
        PATH,
        TITLE,
        ARM,
        UNIVERSE,
        UNIVERSE_TYPE,
        EXCLUSIVE,
        TIMESTAMP
    } = req.body
    const matchesFields = {...req.body}

    try {
        let match = await Matches.findOne({ CARD: CARD })
        if (match) {
            res.send("Matches already exist. ")
            return
        }

        match = new Matches(matchesFields)
        response = await Matches.save()
        res.status(200).send("Matches added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/matches/update
// @desc    Update Matches info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        PLAYER,
        CARD,
        PATH,
        TITLE,
        ARM,
        UNIVERSE,
        UNIVERSE_TYPE,
        EXCLUSIVE,
        TIMESTAMP
    } = req.body
    const matchesFields = {...req.body}

    try {
        await Matches.updateOne({ CARD: CARD }, matchesFields)
        res.status(200).send("Matches successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/matches/delete
// @desc    Delete a Matches
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Matches.findOneAndRemove({DISNAME: req.body.DISNAME})
        res.status(200).send("Matches successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router