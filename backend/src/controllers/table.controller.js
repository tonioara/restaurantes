import { createTable, getTables } from "../services/table.service.js";

export const create = async (req, res) => {
  try {
    const table = await createTable(req.body, req.user._id);
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const tables = await getTables(req.user._id);
    res.json(tables);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};