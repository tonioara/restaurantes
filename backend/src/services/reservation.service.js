import Reservation from "../models/reservation.model.js";
import Restaurant from "../models/restaurant.model.js";
import Table from "../models/table.model.js";




export const createReservation = async (data, userId) => {
  // 1. Obtener restaurante del usuario
  const now = new Date();

// combinamos fecha + hora
const reservationDateTime = new Date(`${data.date}T${data.time}:00`);

if (reservationDateTime < now) {
  throw new Error("Cannot create reservation in the past");
}
  const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
  if (!timeRegex.test(data.time)) {
      throw new Error("Invalid time format. Use HH:mm");
    }
    if (!data.customerName || data.customerName.trim() === "") {
      throw new Error("Customer name is required");
    }

  const restaurant = await Restaurant.findOne({ owner: userId });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  
  // 2. Verificar que la mesa pertenece a ese restaurante
  const table = await Table.findOne({
    _id: data.table,
    restaurant: restaurant._id,
  });

  if (!table) {
    throw new Error("Table not found");
  }

  // 🔥 3. VALIDACIÓN PRO (evitar doble reserva)
  const existingReservation = await Reservation.findOne({
    table: data.table,
    date: data.date,
    time: data.time,
  });

  if (existingReservation) {
    throw new Error("Table already reserved at this time");
  }

  // 4. Crear reserva
  const reservation = await Reservation.create({
    ...data,
    restaurant: restaurant._id,
  });

  return reservation;
};

export const getReservations = async (userId,date ) => {
  const restaurant = await Restaurant.findOne({ owner: userId });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  const filter = { restaurant: restaurant._id };
    if (date) {
        filter.date = date;
    }
  return await Reservation.find(filter).populate("table", "number capacity");
};