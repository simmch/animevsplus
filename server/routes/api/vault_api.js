const express = require("express");
const router = express.Router();
const request = require("request");
const Vault = require("../models/vault")

// @route   GET crown/vault/
// @desc    Get all vault
// @access  Public
router.get("/", async (req, res) => {

    try {
        const vault = await Vault.find({})
        res.json(vault);
        if (!vault) {
            return res
                .status(400)
                .json({ msg: "No vaults were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/vault/$owner
// @desc    Get vault by owner
// @access  Public
router.get("/:owner", async (req, res) => {
    ownername = req.params.owner;

    try {
        const vault = await Vault.findOne({ 'OWNER' : ownername });
        res.json(vault);
        if (!vault) {
            return res
                .status(400)
                .json({ msg: "No vault owners were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})


// @route   POST crown/vault/update
// @desc    Update Vault info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        OWNER,
        BALANCE,
        CARDS,
        TITLES,
        ARMS,
        PETS,
        DECK,
        QUEST,
        DESTINY
    } = req.body
    const vaultFields = {...req.body}

    try {
        await Vault.updateOne({ OWNER: OWNER }, vaultFields)
        res.status(200).send("Vault successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   DELETE crown/vault/delete
// @desc    Delete a Vault
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await Vault.findOneAndRemove({OWNER: req.body.OWNER})
        res.status(200).send("Vault successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})

module.exports = router