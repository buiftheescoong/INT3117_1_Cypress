import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }, 
  avatar: {
    type: String,
    default: "",
  }, 
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "tickets",
    },
  ],
});

export default mongoose.model("users", userSchema);
