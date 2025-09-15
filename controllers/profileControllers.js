const Restaurant = require("../models/restaurantSchema");
const cloudinary = require("../config/cloudinary");

// Create Profile
const createProfile = async (req, res) => {
  try {
    const {
      restaurantName,
      address,
      openAt,
      closeAt,
      premiumTable,
      pricePerTable,
      description,
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

    const newRestaurant = new Restaurant({
      restaurantName,
      address,
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
    console.error("Create Profile Error:", err.message);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

// Get All Profiles
const getProfiles = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

// Get Single Profile
const getProfileById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
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

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Delete Profile
const deleteProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete profile" });
  }
};

module.exports = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
};
