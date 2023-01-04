const express = require("express");
const router = express.Router();
const request = require("request");
const Abyss = require("../models/abyss")

// @route   GET crown/abyss/
// @desc    Get all abysses
// @access  Public
router.get("/", async (req, res) => {

    try {
        const abyss = await Abyss.find({})
        res.json(abyss);
        if (!abyss) {
            return res
                .status(400)
                .json({ msg: "No abysses were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/abyss/$floor
// @desc    Get abyss by floor
// @access  Public
router.get("/:floor", async (req, res) => {

    try {
        const abyss = await Abyss.findOne({ 'FLOOR' : req.params.floor });
        res.json(abyss);
        if (!abyss) {
            return res
                .status(400)
                .json({ msg: "No abysses were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/abyss/update
// @desc    Create new abysses
// @access  Public
router.post("/new", async (req, res) => {

    const {
        FLOOR,
        ENEMIES,
        BANNED_CARDS,
        BANNED_TITLES,
        BANNED_ARMS,
        BANNED_UNIVERSES,
        BANNED_TIERS,
        BANNED_PETS,
        TITLE,
        ARM,
        PET,
        SPECIAL_BUFF,
        TIMESTAMP
    } = req.body
    const abyssFields = {...req.body}
    try {
        let abyss = await Abyss.findOne({ FLOOR: FLOOR })
        if (abyss) {
            res.send("Abyss already exist. ")
            return
        }

        abyss = new Abyss(abyssFields)
        response = await abyss.save()

        res.status(200).send("Abyss added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/abyss/update
// @desc    Update Abyss info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        FLOOR,
        ENEMIES,
        BANNED_CARDS,
        BANNED_TITLES,
        BANNED_ARMS,
        BANNED_UNIVERSES,
        BANNED_TIERS,
        BANNED_PETS,
        TITLE,
        ARM,
        PET,
        SPECIAL_BUFF,
        TIMESTAMP
    } = req.body
    const abyssFields = {...req.body}

    try {
        await Abyss.updateOne({ FLOOR: FLOOR }, abyssFields)
        res.status(200).send("Abyss successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/abyss/delete
// @desc    Delete a Abyss
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Abyss.findOneAndRemove({FLOOR: req.body.FLOOR})
        res.status(200).send("Abyss successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router