const express = require("express");
const router = express.Router();
const request = require("request");
const Card = require("../models/bosses")

// @route   GET crown/bosses/
// @desc    Get all bosses
// @access  Public
router.get("/", async (req, res) => {
    try {
        const boss = await Boss.find({})
        res.json(boss);
        if (!boss) {
            return res
                .status(400)
                .json({ msg: "No bosses were returned. " });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/bosses/$name
// @desc    Get boss by name
// @access  Public
router.get("/:name", async (req, res) => {
    try {
        const boss = await Boss.findOne({ 'NAME': req.params.name });
        if (!boss) {
            res.status(400).send("Boss not found.")
        } else {
            res.json(boss);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/boss/new
// @desc    Create new boss
// @access  Public
router.post("/new", async (req, res) => {

    const {
        NAME,
        PATH,
        TITLE,
        ARM,
        PET,
        CARD,
        DESCRIPTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE
    } = req.body
    const bossFields = { ...req.body }

    try {
        let boss = await Boss.findOne({ NAME: NAME })
        if (boss) {
            res.send("Boss already exist. ")
            return
        }

        boss = new Boss(bossFields)
        response = await boss.save()
        res.status(200).send("Boss added successfully!")

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/boss/update
// @desc    Update boss info
// @access  Public
router.post("/update", async (req, res) => {

    const {
        NAME,
        PATH,
        TITLE,
        ARM,
        PET,
        CARD,
        DESCRIPTION,
        UNIVERSE,
        TIMESTAMP,
        STOCK,
        AVAILABLE,
        EXCLUSIVE
    } = req.body
    const bossFields = { ...req.body }

    try {
        await Boss.updateOne({ NAME: NAME }, bossFields)
        res.status(200).send("Boss successfully updated!")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/boss/delete
// @desc    Delete a boss
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Boss.findOneAndRemove({ NAME: req.body.NAME })
        res.status(200).send("Boss successfully removed. ")
    } catch (err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router