const express = require("express");
const router = express.Router();
const openai = require("openai");
const ai_prompts = require("../prompt_folder/prompt_sheet.js");

// Set your OpenAI API key
const ai = new openai.OpenAI({apiKey: process.env.OPENAI_API_KEY})

// @route   GET crown/ai/prompt/:prompt
// @desc    Make AI Call
// @access  Private
router.get("/prompt/:name/:universe", async (req, res) => {
    try {
        const { name, universe } = req.params;
        const prompt = ai_prompts.card_creation_prompt_function(name, universe);
        const completion = await ai.chat.completions.create({
            messages: [{role: 'user', content: prompt,}],
            model: 'gpt-4-1106-preview',
        })
        const parsedCard = parseCardString(completion.choices[0].message.content);
        res.json(parsedCard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET crown/prompt/abilities/:name/:universe
// @desc    Make AI Call
// @access  Public
router.get("/prompt/abilities/:name/:universe", async (req, res) => {
    try {
        const { name, universe } = req.params;
        const prompt = ai_prompts.get_card_abilities(name, universe);
        const completion = await ai.chat.completions.create({
            messages: [{role: 'user', content: prompt,}],
            model: 'gpt-4-1106-preview',
        })
        const response = completion.choices[0].message.content;
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


function parseCardString(cardString) {
    const lines = cardString.split('\n');
    const parsedObject = {};

    lines.forEach(line => {
        const [key, value] = line.split(': ');
        parsedObject[key] = value;
    });

    const cleanedData = {};

    for (const key in parsedObject) {
        const cleanedKey = key.trim();
        const value = parsedObject[key].replace(/^"|"$/g, ''); // Remove surrounding quotes

        if (value === "[]" || value === "['[]']") {
            cleanedData[cleanedKey] = [];
        } else if (cleanedKey === "weaknesses" || 
                   cleanedKey === "resistances" ||
                   cleanedKey === "repels" ||
                   cleanedKey === "immunity" ||
                   cleanedKey === "absorbs") {
            const arrayValue = value.replace(/\[|\]|"/g, ''); // Remove [ ], " characters
            cleanedData[cleanedKey] = arrayValue.split(',').map(item => item.trim().toUpperCase());
        } else {
            cleanedData[cleanedKey] = value.replace(/\[|\]/g, ''); // Remove square brackets
        }
    }

    return cleanedData;
}

module.exports = router;