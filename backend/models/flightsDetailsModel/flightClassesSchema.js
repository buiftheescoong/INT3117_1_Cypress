import mongoose from "mongoose";
const Schema = mongoose.Schema;

const flightClassesSchema = new Schema({
    flight: {
        type: Schema.Types.ObjectId,
        ref: "flights",
        required: true,
    },
    classType: {
        type: String, // Economy, Business, First
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    avaibleSeats: {
        type: Int32,
        required: true,
    },
    totalSeats: {
        type: Int32,
        required: true,
    }
});

export default mongoose.model("flightClasses", flightClassesSchema);
