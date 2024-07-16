const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Dish = require('./database');

const app = express();
const PORT = 8080;

mongoose.connect('mongodb://127.0.0.1:27017/dishdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(cors());


const initializeData = async () => {
  const count = await Dish.countDocuments();
  if (count === 0) {
    const dishes = [
      { dishId: 1, dishName: "Jeera Rice", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg", isPublished: true },
      { dishId: 2, dishName: "Paneer Tikka", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg", isPublished: true },
      { dishId: 3, dishName: "Rabdi", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg", isPublished: true },
      { dishId: 4, dishName: "Chicken Biryani", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg", isPublished: true },
      { dishId: 5, dishName: "Alfredo Pasta", imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg", isPublished: true },
    ];

    await Dish.insertMany(dishes);
  }
};

initializeData();

//get the entire data
app.get('/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json({ data: dishes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//publish/ unpublish
app.put('/dishes/:id/', async (req, res) => {
  try {
    const dish = await Dish.findOne({ dishId: req.params.id });
    if (!dish) {
      res.status(400).json({ error: "Dish not found" });
      return;
    }
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.json({ success: true, isPublished: dish.isPublished });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
