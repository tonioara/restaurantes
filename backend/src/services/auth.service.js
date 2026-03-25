import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  user.password = undefined; // Hide password in response
  return user;
};

export const loginUser = async ({ email, password }) => {
  
  const user = await User.findOne({ email }).select("+password");
  

console.log("ANTES DE BCRYPT:", user);
console.log("PASSWORD EN DB:", user.password);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  console.log("USER DB:", user);
console.log("PASSWORD INGRESADO:", password);
console.log("HASH DB:", user?.password);
  return { user, token };
};