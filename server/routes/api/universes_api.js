const express = require("express");
const router = express.Router();
const request = require("request");
const Universe = require("../models/universes")

// @route   GET crown/universe/
// @desc    Get all universes
// @access  Public
router.get("/", async (req, res) => {

    try {
        const universe = await Universe.find({})
        res.json(universe);
        if (!universe) {
            return res
                .status(400)
                .json({ msg: "No universes were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/universe/$title
// @desc    Get universe by title
// @access  Public
router.get("/:title", async (req, res) => {

    try {
        const universe = await Universe.findOne({ 'TITLE' : req.params.title });
        res.json(universe);
        if (!universe) {
            return res
                .status(400)
                .json({ msg: "No universes were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/universes/update
// @desc    Create new universes
// @access  Public
router.post("/new", async (req, res) => {

    const {
        TITLE,
        PATH,
        CROWN_TALES,
        DUNGEONS,
        GUILD,
        PREREQUISITE,
        UNIVERSE_BOSS,
        HAS_CROWN_TALES,
        HAS_DUNGEON,
        UTITLE,
        UARM,
        DTITLE,
        DARM,
        UPET,
        DPET,
        TIMESTAMP,
        TIER,
        CORRUPTION_LEVEL,
        CORRUPTED
    } = req.body
    const universeFields = {...req.body}
    try {
        let universe = await Universe.findOne({ TITLE: TITLE })
        if (universe) {
            res.send("Universe already exist. ")
            return
        }

        universe = new Universe(universeFields)
        response = await universe.save()

        res.status(200).send("Universe added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/universe/update
// @desc    Update Universe info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        TITLE,
        PATH,
        CROWN_TALES,
        DUNGEONS,
        GUILD,
        PREREQUISITE,
        UNIVERSE_BOSS,
        HAS_CROWN_TALES,
        HAS_DUNGEON,
        UTITLE,
        UARM,
        DTITLE,
        DARM,
        UPET,
        DPET,
        TIMESTAMP,
        TIER,
        CORRUPTION_LEVEL,
        CORRUPTED
    } = req.body
    const universeFields = {...req.body}

    try {
        await Universe.updateOne({ TITLE: TITLE }, universeFields)
        res.status(200).send("Universe successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/universe/delete
// @desc    Delete a Universe
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Universe.findOneAndRemove({TITLE: req.body.TITLE})
        res.status(200).send("Universe successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router