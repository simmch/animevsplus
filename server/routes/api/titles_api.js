const express = require("express");
const router = express.Router();
const request = require("request");
const Title = require("../models/titles")

// @route   GET crown/titles/
// @desc    Get all Titles
// @access  Public
router.get("/", async (req, res) => {

    try {
        const title = await Title.find({})
        res.json(title);
        if (!title) {
            return res
                .status(400)
                .json({ msg: "No Titles were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})


router.get("/names/:universe", async (req, res) => {
    try {
        const { universe } = req.params;
        const titles = await Title.find({ UNIVERSE: universe }, "TITLE");
        if (!titles) {
            return res.status(400).json({ msg: `No titles were found for universe '${universe}'` });
        }
        res.json(titles.map(title => title.TITLE));
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.");
    }
});

// @route   GET crown/titles/$title
// @desc    Get Titles by Title
// @access  Public
router.get("/:title", async (req, res) => {

    try {
        const title = await Title.findOne({ 'TITLE' : req.params.title });
        res.json(title);
        if (!title) {
            return res
                .status(400)
                .json({ msg: "No Titles were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/titles/$universe
// @desc    Get Titles by Title
// @access  Public
router.get("/:universe", async (req, res) => {

    try {
        const title = await Title.find({ 'UNIVERSE' : req.params.universe });
        res.json(title);
        if (!title) {
            return res
                .status(400)
                .json({ msg: "No Titles were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/titles/new
// @desc    Create new Title
// @access  Public
router.post("/new", async (req, res) => {

    const {
        TITLE,
        ABILITIES,
        UNIVERSE,
        TIMESTAMP,
        AVAILABLE,
        RARITY,
        UNLOCK_METHOD,
        ID
    } = req.body
    const titleFields = {...req.body}

    try {
        let title = await Title.findOne({ TITLE: TITLE })
        if (title) {
            res.send("Title already exist. ")
            return
        }

        title = new Title(titleFields)
        response = await title.save()
        res.status(200).send("Title added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/titles/update
// @desc    Update Title info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        TITLE,
        ABILITIES,
        UNIVERSE,
        TIMESTAMP,
        AVAILABLE,
        RARITY,
        UNLOCK_METHOD,
        ID
    } = req.body
    const titleFields = {...req.body}

    try {
        await Title.updateOne({ TITLE: TITLE }, titleFields)
        res.status(200).send("Title successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/titles/delete
// @desc    Delete a Title
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Title.findOneAndRemove({TITLE: req.body.TITLE})
        res.status(200).send("Title successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router