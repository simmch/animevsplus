const express = require("express");
const axios = require("axios");
const router = express.Router();

// Function to handle Tenor API response
async function tenorCallbackSearch(search_term) {
  const apikey = process.env.TENOR_API_KEY;
  const lmt = 20;
  const searchUrl = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${apikey}&limit=${lmt}`;

  try {
    const response = await axios.get(searchUrl);
    return response.data.results;
  } catch (error) {
    console.error('Damn, something went wrong:', error);
    return null;
  }
}

// Tenor route to get GIFs by search term
router.get("/:term", async (req, res) => {
  try {
    const response = await tenorCallbackSearch(req.params.term);
    if (!response) {
        res.status(400).send("GIFs not found.");
    } else {
        const gifs = response.map(result => result.media_formats.gif.url);
        res.json(gifs);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;