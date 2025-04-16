import users from "../models/userSchema.js";
import tickets from "../models/ticketSchema.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecretKey = process.env.JWT_TOKEN;
const saltRounds = 10;

const createJWTToken = (payload) => {
  return jwt.sign(payload, jwtSecretKey, { expiresIn: "10d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required fields" });
  }

  if(!emailRegex.test(email)){
    return res
      .status(400)
      .json({ error: "Invalid email format" });
  }

  if(!passwordRegex.test(password)){
    return res
      .status(400)
      .json({ error: "Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers" });
  }

  const existingUser = await users.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new users({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(400).json("Something went wrong");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email and password are required fields" });
  }

  try {
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = createJWTToken(payload);

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
     
    };

    return res
      .status(200)
      .json({ message: "Login successful", token, data: userData });
  } catch (error) {
    console.error("Login error:", error); 
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await users.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const booked_tickets = user.bookings;
    const ticketsObj = [];

    
    for (let i = 0; i < booked_tickets.length; i++) {
      const ticket = await tickets.findById(booked_tickets[i]);
      ticketsObj.push(ticket); 
    }
    return res.status(200).json({user, booked_tickets: ticketsObj});

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


