const express = require("express");
const router = express.Router();
const request = require("request");
const Scenario = require("../models/scenarios")

// @route   GET crown/scenario/
// @desc    Get all scenarios
// @access  Public
router.get("/", async (req, res) => {

    try {
        const scenario = await Scenario.find({})
        res.json(scenario);
        if (!scenario) {
            return res
                .status(400)
                .json({ msg: "No scenarios were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/scenario/$title
// @desc    Get scenario by title
// @access  Public
router.get("/:title", async (req, res) => {

    try {
        const scenario = await Scenario.findOne({ 'TITLE' : req.params.title });
        res.json(scenario);
        if (!scenario) {
            return res
                .status(400)
                .json({ msg: "No scenarios were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/scenarios/update
// @desc    Create new scenarios
// @access  Public
router.post("/new", async (req, res) => {

    const {
        TITLE,
        IMAGE,
        ENEMY_LEVEL,
        ENEMIES,
        EASY_DROPS,
        NORMAL_DROPS,
        HARD_DROPS,
        UNIVERSE,
        AVAILABLE,
    } = req.body
    const scenarioFields = {...req.body}
    try {
        let scenario = await Scenario.findOne({ TITLE: TITLE })
        if (scenario) {
            res.send("Scenario already exist. ")
            return
        }

        scenario = new Scenario(scenarioFields)
        response = await scenario.save()

        res.status(200).send("Scenario added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/scenario/update
// @desc    Update Scenario info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        TITLE,
        IMAGE,
        ENEMY_LEVEL,
        ENEMIES,
        EASY_DROPS,
        NORMAL_DROPS,
        HARD_DROPS,
        UNIVERSE,
        AVAILABLE,
    } = req.body
    const scenarioFields = {...req.body}

    try {
        await Scenario.updateOne({ TITLE: TITLE }, scenarioFields)
        res.status(200).send("Scenario successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/scenario/delete
// @desc    Delete a Scenario
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Scenario.findOneAndRemove({TITLE: req.body.TITLE})
        res.status(200).send("Scenario successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router