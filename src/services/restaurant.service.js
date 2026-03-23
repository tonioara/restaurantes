import Restaurant from "../models/restaurant.model.js";

export const createRestaurant = async (data, userId) => {
  // 1. Verificar si ya tiene restaurante
  const existing = await Restaurant.findOne({ owner: userId }).populate("owner", "name email" );

  if (existing) {
    throw new Error("User already has a restaurant");
  }

  // 2. Crear restaurante
  const restaurant = await Restaurant.create({
    ...data,
    owner: userId,
  });

  return restaurant;
};

export const getMyRestaurant = async (userId) => {
  return await Restaurant.findOne({ owner: userId });
};