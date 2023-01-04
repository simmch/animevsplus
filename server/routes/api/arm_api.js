const express = require("express");
const router = express.Router();
const request = require("request");
const Arm = require("../models/arms")

// @route   GET crown/arms/
// @desc    Get all arms
// @access  Public
router.get("/", async (req, res) => {

    try {
        const arms = await Arm.find({})
        res.json(arms);
        if (!arms) {
            return res
                .status(400)
                .json({ msg: "No arms were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/arms/$arm
// @desc    Get Arm by name
// @access  Public
router.get("/:arm", async (req, res) => {

    try {
        const arms = await Arm.findOne({ 'ARM' : req.params.arm });
        res.json(arms);
        if (!arms) {
            return res
                .status(400)
                .json({ msg: "No arms were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/arms/$arm
// @desc    Get Arm by name
// @access  Public
router.get("/universe/:universe", async (req, res) => {

    try {
        const arms = await Arm.find({ 'UNIVERSE' : req.params.universe });
        res.json(arms);
        if (!arms) {
            return res
                .status(400)
                .json({ msg: "No arms were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/arms/$universe
// @desc    Get Arm by universe
// @access  Public
router.get("/:universe", async (req, res) => {

    try {
        const arms = await Arm.findOne({ 'UNIVERSE' : req.params.universe });
        res.json(arms);
        if (!arms) {
            return res
                .status(400)
                .json({ msg: "No arms were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/arms/new
// @desc    Create new Arm
// @access  Public
router.post("/new", async (req, res) => {

    const {
        ARM,
        PRICE,
        ABILITIES,
        COLLECTION,
        STOCK,
        UNIVERSE,
        TOURNAMENT_REQUIREMENTS,
        TIMESTAMP,
        AVAILABLE,
        EXCLUSIVE,
        ELEMENT
    } = req.body
    const armFields = {...req.body}

    try {
        let arm = await Arm.findOne({ ARM: ARM })
        if (arm) {
            res.send("Arm already exist. ")
            return
        }

        arm = new Arm(armFields)
        response = await arm.save()
        res.status(200).send("Arm added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/arms/update
// @desc    Update Arm info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        ARM,
        PRICE,
        ABILITIES,
        COLLECTION,
        STOCK,
        UNIVERSE,
        TOURNAMENT_REQUIREMENTS,
        TIMESTAMP,
        AVAILABLE,
        EXCLUSIVE,
        ELEMENT
    } = req.body
    const armFields = {...req.body}

    try {
        await Arm.updateOne({ ARM: ARM }, armFields)
        res.status(200).send("Arm successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/arms/delete
// @desc    Delete a Arm
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Arm.findOneAndRemove({ARM: req.body.ARM})
        res.status(200).send("Arm successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router