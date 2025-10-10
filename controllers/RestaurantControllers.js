const Restaurant = require("../models/restaurantModel");
const cloudinary = require("../config/cloudinary");

// ✅ Create Profile (auth required)
const createRestuarant = async (req, res) => {
  try {
    const {
      restaurantName,
      restaurantCountry,
      restaurantAddress,
      openAt,
      closeAt,
      premiumTable,
      pricePerTable,
      description,
      restaurantRating
      // partnerId,
    } = req.body;

    let photoUrl = "";
    let secondaryPhotoUrl = "";

    if (req.files?.restaurantPhoto) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.restaurantPhoto.tempFilePath,
        { folder: "restaurants" }
      );
      photoUrl = uploadRes.secure_url;
    }

    if (req.files?.secondaryPhoto) {
      const uploadRes2 = await cloudinary.uploader.upload(
        req.files.secondaryPhoto.tempFilePath,
        { folder: "restaurants" }
      );
      secondaryPhotoUrl = uploadRes2.secure_url;
    }

    // Link profile to logged-in partner
    const newRestaurant = new Restaurant({
      restaurantName,
      restaurantAddress,
      restaurantCountry,
      restaurantRating,
      openAt,
      closeAt,
      premiumTable,
      pricePerTable,
      description,
      restaurantPhoto: photoUrl,
      secondaryPhoto: secondaryPhotoUrl,
    });

    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error("Create Profile Error:", err);
    res.status(500).json({ error: err });
  }
};

// ✅ Get logged-in partner’s profile
const getAllRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find({});
    if (!restaurant) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// ✅ Update Profile (only owner)
const updateResturant = async (req, res) => {
  try {
    const updates = req.body;

    if (req.files?.restaurantPhoto) {
      const uploadRes = await cloudinary.uploader.upload(
        req.files.restaurantPhoto.tempFilePath,
        { folder: "restaurants" }
      );
      updates.restaurantPhoto = uploadRes.secure_url;
    }

    if (req.files?.secondaryPhoto) {
      const uploadRes2 = await cloudinary.uploader.upload(
        req.files.secondaryPhoto.tempFilePath,
        { folder: "restaurants" }
      );
      updates.secondaryPhoto = uploadRes2.secure_url;
    }

    // Ensure only the owner can update
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "Profile not found or unauthorized" });
    }

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// ✅ Delete Profile (only owner)
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Profile not found or unauthorized" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete profile" });
  }
};

module.exports = {
  createRestuarant,
  getAllRestaurant,
  updateResturant,
  deleteRestaurant,
};
