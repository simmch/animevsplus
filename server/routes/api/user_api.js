const express = require("express");
const router = express.Router();
const request = require("request");
const User = require("../models/users")
const Card = require("../models/cards")

// @route   GET crown/users/
// @desc    Get all users
// @access  Public
router.get("/", async (req, res) => {

    try {
        const users = await User.find({})
        res.json(users);
        if (!users) {
            return res
                .status(400)
                .json({ msg: "No users were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/users/$disname
// @desc    Get users by name
// @access  Public
router.get("/:disname", async (req, res) => {

    try {
        const users = await User.findOne({ 'DISNAME' : req.params.disname });
        res.json(users);
        if (!users) {
            return res
                .status(400)
                .json({ msg: "No users were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   GET crown/users/$did
// @desc    Get users by name
// @access  Public
router.get("/did/:did", async (req, res) => {

    try {
        const users = await User.findOne({ 'DID' : req.params.did });
        res.json(users);
        if (!users) {
            return res
                .status(400)
                .json({ msg: "No users were returned. " });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

// @route   POST crown/users/new
// @desc    Create new user
// @access  Public
router.post("/new", async (req, res) => {
    const {
        DISNAME,
        NAME,
        DID,
        AVATAR,
        IGN,
        GAMES,
        GUILD,
        TEAM,
        FAMILY,
        TITLE,
        CARD,
        ARM,
        DECK,
        TALISMAN,
        PET,
        TOURNAMENT_WINS,
        TOURNAMENT_LOSSES,
        AVAILABLE,
        CROWN_TALES,
        DUNGEONS,
        BOSS_WINS,
        REFERRED,
        REFERRER,
        TIMESTAMP,
        IS_ADMIN,
        U_PRESET,
        RIFT,
        REBIRTH,
        RETRIES,
        PRESTIGE,
        PATRON,
        LEVEL,
        PVP_WINS,
        PVP_LOSS,
        EXPLORE,
        SAVE_SPOT,
        RPG_LEVELS,
        PERFORMANCE,
        TRADING,
        TEXT_ONLY,
        BOSS_FOUGHT,
        AUTOSAVE,
        SERVER,
        DIFFICULTY,
        STORAGE_TYPE,
        CREATOR,
        VOTED,
        USED_CODES,
        BATTLE_HISTORY,
        SCENARIO_HISTORY,
        FAMILY_PET,
        EXPLORE_LOCATION,
        FAMILY_DID,
        BALANCE,
        CARDS,
        TITLES,
        ARMS,
        ESSENCE,
        PETS,
        CARD_LEVELS,
        QUESTS,
        DESTINY,
        GEMS,
        STORAGE,
        TSTORAGE,
        ASTORAGE,
        TALISMANS,
        EQUIPPED_SUMMON
    } = req.body;

    const userFields = {...req.body};

    try {
        let user = await User.findOne({ DISNAME: DISNAME });
        if (user) {
            return res.status(400).send("User already exists.");
        }

        user = new User(userFields);
        await user.save();
        res.status(200).send("User added successfully!");

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.");
    }
});


// @route   POST crown/Users/update
// @desc    Update User info
// @access  Public
router.post("/update", async (req, res) => {
 
    const {
        DISNAME,
        NAME,
        DID,
        AVATAR,
        IGN,
        GAMES,
        GUILD,
        TEAM,
        FAMILY,
        TITLE,
        CARD,
        ARM,
        DECK,
        TALISMAN,
        PET,
        TOURNAMENT_WINS,
        TOURNAMENT_LOSSES,
        AVAILABLE,
        CROWN_TALES,
        DUNGEONS,
        BOSS_WINS,
        REFERRED,
        REFERRER,
        TIMESTAMP,
        IS_ADMIN,
        U_PRESET,
        RIFT,
        REBIRTH,
        RETRIES,
        PRESTIGE,
        PATRON,
        LEVEL,
        PVP_WINS,
        PVP_LOSS,
        EXPLORE,
        SAVE_SPOT,
        RPG_LEVELS,
        PERFORMANCE,
        TRADING,
        TEXT_ONLY,
        BOSS_FOUGHT,
        AUTOSAVE,
        SERVER,
        DIFFICULTY,
        STORAGE_TYPE,
        CREATOR,
        VOTED,
        USED_CODES,
        BATTLE_HISTORY,
        SCENARIO_HISTORY,
        FAMILY_PET,
        EXPLORE_LOCATION,
        FAMILY_DID,
        BALANCE,
        CARDS,
        TITLES,
        ARMS,
        ESSENCE,
        PETS,
        CARD_LEVELS,
        QUESTS,
        DESTINY,
        GEMS,
        STORAGE,
        TSTORAGE,
        ASTORAGE,
        TALISMANS,
        EQUIPPED_SUMMON
    } = req.body;
    const userFields = {...req.body}

    try {
        await User.updateOne({ DISNAME: DISNAME }, userFields)
        res.status(200).send("User successfully updated!")
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})


// @route   DELETE crown/Users/delete
// @desc    Delete a User
// @access  Public
router.delete("/delete", async (req, res) => {
    try {
        await User.findOneAndRemove({DISNAME: req.body.DISNAME})
        res.status(200).send("User successfully removed. ")
    } catch(err) {
        res.status(500).send("Server Error")
    }
})


// // @route   GET crown/users/:did/:field
// // @desc    Get a specific field from user data by DID
// // @access  Public
// router.get('/:did/:field', async (req, res) => {
//     const { did, field } = req.params;

//     try {
//         const user = await User.findOne({ DID: did });

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         if (!(field in user._doc)) {
//             return res.status(400).json({ msg: 'Invalid field' });
//         }

//         const fieldValue = user[field];
//         res.json({ [field]: fieldValue });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });



// @route   DELETE crown/users/:did/card/:cardName
// @desc    Remove a specific card from CARDS and CARD_LEVELS in user data by DID
// @access  Public (consider adding authentication middleware for production)
router.delete('/:did/card/:cardName', async (req, res) => {
    const { did, cardName } = req.params;

    try {
        const user = await User.findOne({ DID: did });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Remove card from CARDS array
        const cardIndex = user.CARDS.indexOf(cardName);
        if (cardIndex > -1) {
            user.CARDS.splice(cardIndex, 1);
        } else {
            return res.status(404).json({ msg: 'Card not found in CARDS' });
        }

        // Remove card from CARD_LEVELS array
        user.CARD_LEVELS = user.CARD_LEVELS.filter(cardLevel => cardLevel.CARD !== cardName);

        await user.save();

        res.json({ 
            msg: 'Card removed successfully from CARDS and CARD_LEVELS', 
            CARDS: user.CARDS,
            CARD_LEVELS: user.CARD_LEVELS
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE crown/users/:did/:field/:item
// @desc    Remove a specific item from an array field in user data by DID
// @access  Public (consider adding authentication middleware for production)
router.delete('/:did/:field/:item', async (req, res) => {
    const { did, field, item } = req.params;

    try {
        const user = await User.findOne({ DID: did });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!(field in user._doc)) {
            return res.status(400).json({ msg: 'Invalid field' });
        }

        if (!Array.isArray(user[field])) {
            return res.status(400).json({ msg: 'Field is not an array' });
        }

        const index = user[field].indexOf(item);
        if (index > -1) {
            user[field].splice(index, 1);
            await user.save();
            res.json({ msg: 'Item removed successfully', [field]: user[field] });
        } else {
            res.status(404).json({ msg: 'Item not found in the array' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET crown/users/:did/cards
// @desc    Get user's cards with full card data
// @access  Public (consider adding authentication middleware for production)
router.get('/:did/cards', async (req, res) => {
    const { did } = req.params;

    try {
        const user = await User.findOne({ DID: did });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.CARDS || !Array.isArray(user.CARDS)) {
            return res.status(400).json({ msg: 'User has no cards or CARDS field is not an array' });
        }

        // Fetch full card data for each card in user's CARDS array
        const fullCardData = await Promise.all(user.CARDS.map(async (cardName) => {
            const card = await Card.findOne({ NAME: cardName });
            if (!card) {
                return { NAME: cardName, error: 'Card data not found' };
            }
            return card;
        }));

        res.json({ 
            userCards: user.CARDS,
            fullCardData: fullCardData
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

