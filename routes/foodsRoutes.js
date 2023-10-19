const express = require("express");
const router = express.Router();
const {
  getAllFoods,
  postFood,
  getAFood,
  patchFood,
  deleteFood,
} = require("../controllers/foodsController");

// creating routes
router.get("/", getAllFoods);

router.post("/", postFood);


router.get("/:id", getAFood);

router.patch("/:id", patchFood);

router.delete("/:id", deleteFood);

module.exports = router;
