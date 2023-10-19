const FoodsModel = require("../model/foodsModel");

const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodsModel.find().sort({ createdAt: -1 });
    return res.status(200).json(foods);
  } catch (error) {
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const postFood = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  try {
    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ err: "Please fill in all fields" });
    }

    // to create an instance of the ,model
    // const crud = new CrudModel({ title, description });
    // await crud.save()

    const food = await FoodsModel.create({
      name,
      description,
      price,
      category,
      image,
    });
    return res.status(201).json(food);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const getAFood = async (req, res) => {
  const { id } = req.params;

  // Also the same as the line 35, the different is line 88 is only getting a single id, while line 35 we can get different parameters
  // const id = req.params.id
  try {
    const food = await FoodsModel.findById(id);
    if (!food) {
      return res.status(404).json({ msg: "Data not found" });
    }
    return res.status(200).json(food);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};
const patchFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image } = req.body;
  console.log(id);
  try {
    const foodUpdate = await FoodsModel.findByIdAndUpdate(
      id,

      // {title, description}
      { ...req.body }, //using rest operator instead og line 55
      { new: true }
    );
    if (!foodUpdate) {
      return res.status(404).json({ msg: "Data not found" });
    }
    return res.status(200).json(foodUpdate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const foodDelete = await CrudModel.findById(id);
    if (!foodDelete) {
      return res.status(404).json({ msg: "Data not found" });
    }
    await FoodsModel.deleteOne(foodDelete);
    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

module.exports = { patchFood, postFood, deleteFood, getAFood, getAllFoods };
