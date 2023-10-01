const express = require("express");
const cloudinary = require('cloudinary').v2;
const auth = require("../middleware/isAuthorized")
const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const searchImagesByName = async (name) => {
    try {
      const result = await cloudinary.search
        .expression(`resource_type:image AND public_id:/*${name}*`) // Search for images with public_id starting with `name`
        .sort_by('created_at', 'desc')
        .execute();
  
      return result.resources;
    } catch (error) {
      console.error('Error searching for images:', error);
      return [];
    }
  };
  

// @route  GET crown/cloudinary/$name
// @desc    Get images by name
// @access  Public
router.get("/:name", async (req, res) => {
    try {
        const images = await searchImagesByName(req.params.name);
        if (!images) {
            res.status(400).send("Image not found.")
        } else {
            res.json(images);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error.")
    }
})

module.exports = router