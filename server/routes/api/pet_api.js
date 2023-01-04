const express = require("express");
const router = express.Router();
const request = require("request");
const Pet = require("../models/pets")

// @route   GET crown/pets/
// @desc    Get all pets
// @access  Public
router.get("/", async (req, res) => {

    try {
        const pets = await Pet.find({})
        res.json(pets);
        if (!pets) {
            return res
                .status(400)
                .json({ msg: "No pets were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/pets/$pet
// @desc    Get pets by PET
// @access  Public
router.get("/:pet", async (req, res) => {

    try {
        const pets = await Pet.findOne({ 'PET' : req.params.pet });
        res.json(pets);
        if (!pets) {
            return res
                .status(400)
                .json({ msg: "No pets were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/pets/$universe
// @desc    Get pets by PET
// @access  Public
router.get("/:universe", async (req, res) => {

    try {
        const pets = await Pet.findOne({ 'UNIVERSE' : req.params.universe });
        res.json(pets);
        if (!pets) {
            return res
                .status(400)
                .json({ msg: "No pets were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/pets/new
// @desc    Create new Pet
// @access  Public
router.post("/new", async (req, res) => {

    const {
        PET,
        PATH,
        UNIVERSE,
        LVL,
        ABILITIES,
        COLLECTION,
        TIMESTAMP,
        AVAILABLE,
        EXCLUSIVE
    } = req.body
    const petFields = {...req.body}

    try {
        let pet = await Pet.findOne({ PET: PET })
        if (pet) {
            res.send("Pet already exist. ")
            return
        }

        pet = new Pet(petFields)
        response = await pet.save()
        res.status(200).send("Pet added successfully!")

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/pets/update
// @desc    Update Pet info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        PET,
        PATH,
        ABILITIES,
        LVL,
        UNIVERSE,
        COLLECTION,
        TIMESTAMP,
        AVAILABLE,
        EXCLUSIVE
    } = req.body
    const petFields = {...req.body}

    try {
        await Pet.updateOne({ PET: PET }, petFields)
        res.status(200).send("Pet successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/pets/delete
// @desc    Delete a Pet
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Pet.findOneAndRemove({PET: req.body.PET})
        res.status(200).send("Pet successfully removed. ")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router