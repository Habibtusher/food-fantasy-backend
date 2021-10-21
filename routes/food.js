const router = require("express").Router();
const Food = require("../models/foodSchema");

router.post("/add-food", async (req, res) => {
  const newFoodDetail = req.body;

  try {
    // Create new user
    const newFood = await new Food(newFoodDetail);

    //   save and return response
    const food = await newFood.save();
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-food", async (req, res) => {
  try {
    Food.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(error);
    res.status(500).json(err);
  }
});

router.post("/search-food", async (req, res) => {
  console.log(req.body);
  try {
    const food = await Food.find({
      category: { $regex: req.body.category, $options: "$in" },
    });
    !food && res.status(400).json("No food found");
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json("food");
  }
});

// router.get("/single-property/:id", async (req, res) => {
//   const id = req.params.id
//   try {
//     const singleProperty = await Property.findById(id)
//     !singleProperty && res.status(400).json("No Post found");
//     res.status(200).json(singleProperty);
//   } catch (err) {
//     console.log(error)
//     res.status(500).json(err);
//   }
// });
module.exports = router;
