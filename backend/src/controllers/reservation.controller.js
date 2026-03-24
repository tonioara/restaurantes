import {
  createReservation,
  getReservations,
} from "../services/reservation.service.js";

export const create = async (req, res) => {
  try {
    const reservation = await createReservation(req.body, req.user._id);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const { date } = req.query;
    const reservations = await getReservations(req.user._id, date);
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};