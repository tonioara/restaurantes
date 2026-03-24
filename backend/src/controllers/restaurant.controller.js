import {
  createRestaurant,
  getMyRestaurant,
} from "../services/restaurant.service.js";

export const create = async (req, res) => {
  try {
    const restaurant = await createRestaurant(req.body, req.user._id);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMine = async (req, res) => {
  try {
    const restaurant = await getMyRestaurant(req.user._id);
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};