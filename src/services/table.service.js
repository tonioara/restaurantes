import Table from "../models/table.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createTable = async (data, userId) => {
  // 1. Buscar restaurante del usuario
  const restaurant = await Restaurant.findOne({ owner: userId });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  // 🔥 2. VALIDACIÓN (acá va la mejora)
  const existingTable = await Table.findOne({
    number: data.number,
    restaurant: restaurant._id,
  });

  if (existingTable) {
    throw new Error("Table number already exists");
  }

  // 3. Crear mesa
  const table = await Table.create({
    ...data,
    restaurant: restaurant._id,
  });

  return table;
};

export const getTables = async (userId) => {
  const restaurant = await Restaurant.findOne({ owner: userId });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  return await Table.find({ restaurant: restaurant._id });
};