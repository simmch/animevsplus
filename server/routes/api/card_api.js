const express = require("express");
const router = express.Router();
const request = require("request");
const Card = require("../models/cards")
const auth = require("../middleware/isAuthorized")

// @route   GET crown/cards/
// @desc    Get all cards
// @access  Public
router.get("/", async (req, res) => {
    try {
        const cards = await Card.find({})
        res.json(cards);
        if (!cards) {
            return res
                .status(400)
                .json({ msg: "No cards were returned. " });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/cards/$name
// @desc    Get cards by name
// @access  Public
router.get("/:name", auth, async (req, res) => {
    try {
        const cards = await Card.findOne({ 'NAME': req.params.name });
        if (!cards) {
            res.status(400).send("Card not found.")
        } else {
            res.json(cards);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/cards/$universe
// @desc    Get cards by universe
// @access  Public
router.get("/universe/:universe", auth, async (req, res) => {
    try {
        const cards = await Card.find({ 'UNIVERSE': req.params.universe });
        if (!cards) {
            res.status(400).send("Card not found.")
        } else {
            res.json(cards);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/cards/new
// @desc    Create new card
// @access  Public
router.post("/new", auth, async (req, res) => {

    const {
        NAME,
        RNAME,
        PATH,
        FPATH,
        RPATH,
        GIF,
        PRICE,
        MOVESET,
        PASS,
        HLT,
        STAM,
        ATK,
        DEF,
        SPD,
        TIER,
        VUL,
        TYPE,
        COLLECTION,
        HAS_COLLECTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE,
        DESCRIPTIONS,
        IS_SKIN,
        SKIN_FOR,
        WEAKNESS,
        RESISTANT,
        REPEL,
        IMMUNE,
        ABSORB
    } = req.body
    const cardFields = { ...req.body }
    try {
        let card = await Card.findOne({ NAME: NAME })
        if (card) {
            res.send("Card already exist. ")
            return
        }

        card = new Card(cardFields)
        response = await card.save()
        res.status(200).send("Card added successfully!")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/cards/update
// @desc    Update card info
// @access  Public
router.post("/update", auth, async (req, res) => {

    const {
        NAME,
        RNAME,
        PATH,
        FPATH,
        RPATH,
        GIF,
        PRICE,
        MOVESET,
        PASS,
        HLT,
        STAM,
        ATK,
        DEF,
        SPD,
        TIER,
        VUL,
        TYPE,
        COLLECTION,
        HAS_COLLECTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE,
        DESCRIPTIONS,
        IS_SKIN,
        SKIN_FOR,
        WEAKNESS,
        RESISTANT,
        REPEL,
        IMMUNE,
        ABSORB

    } = req.body
    const cardFields = { ...req.body }

    try {
        await Card.updateOne({ NAME: NAME }, cardFields)
        res.status(200).send("Card successfully updated!")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/cards/delete
// @desc    Delete a card
// @access  Public
router.delete("/delete", auth, async (req, res) => {
    const {
        NAME,
        RNAME,
        PATH,
        FPATH,
        RPATH,
        GIF,
        PRICE,
        MOVESET,
        PASS,
        HLT,
        STAM,
        ATK,
        DEF,
        SPD,
        TIER,
        VUL,
        TYPE,
        COLLECTION,
        HAS_COLLECTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE,
        DESCRIPTIONS,
        IS_SKIN,
        SKIN_FOR,
        WEAKNESS,
        RESISTANT,
        REPEL,
        IMMUNE,
        ABSORB
    } = req.body
    const cardFields = { ...req.body }
    try {
        await Card.findOneAndRemove({ NAME: cardFields.NAME })
        res.status(200).send("Card successfully removed. ")
    } catch (err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router