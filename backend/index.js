import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import flightRoute from "./Routes/flights.js";
import authRoute from "./Routes/auth.js";
import aircraftRoute from "./Routes/aircraft.js";
import classTypeRoute from "./Routes/classType.js";
import locationRoute from "./Routes/location.js";
import airportRoute from "./Routes/airport.js";
import bookingRoute from "./Routes/booking.js";
import promotionRoute from "./Routes/promotion.js";
import ticketRoute from "./Routes/ticket.js"

dotenv.config();

const app = express();

const corsOptions = {
  origin: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("server is working");
});

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};


app.use("/api/flights", flightRoute);
app.use("/api/auth", authRoute);
app.use("/api/aircrafts", aircraftRoute);
app.use("/api/classType", classTypeRoute);
app.use("/api/locationsMove", locationRoute);
app.use("/api/airports", airportRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/promotions", promotionRoute);
app.use("/api/tickets", ticketRoute);



app.listen(5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
