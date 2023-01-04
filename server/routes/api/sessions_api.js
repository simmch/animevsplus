const express = require("express");
const router = express.Router();
const request = require("request");
const Sessions = require("../models/sessions")

// @route   GET pcg/sessions/
// @desc    Get all sessions
// @access  Public
router.get("/", async (req, res) => {

    try {
        const sessions = await Sessions.find({})
        res.json(sessions);
        if (!sessions) {
            return res
                .status(400)
                .json({ msg: "No sessions were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})


// @route   GET pcg/sessions/$OWNER
// @desc    Get sessions by owner
// @access  Public
router.get("/:owner", async (req, res) => {

    try {
        const sessions = await Sessions.findOne({ 'OWNER' : req.params.owner });
        res.json(sessions);
        if (!sessions) {
            return res
                .status(400)
                .json({ msg: "No sessions were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET pcg/sessions/$GAME
// @desc    Get sessions by game
// @access  Public
router.get("/:game", async (req, res) => {

    try {
        const sessions = await Sessions.findOne({ 'GAME' : req.params.game });
        res.json(sessions);
        if (!sessions) {
            return res
                .status(400)
                .json({ msg: "No sessions were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})



module.exports = router