import mongoose from "mongoose";
import dayInfors from "./dayInforsSchema.js";
const Schema = mongoose.Schema;


const flightSchema = new Schema({
  flightNumber: {
    type: String,
    required: true
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'locationMove',
    required: true,
  },

  to: {
    type: Schema.Types.ObjectId,
    ref: 'locationMove',
    required: true,
  },

  departDate: dayInfors,

  arriveDate: dayInfors,

  price : {
    type : Number,
    required : true
  },

  seatDetails : [
    {
      classType:{
        type: String,
        required : true,
      },

      seats: [
          {
            seatNumber: {type: String, required: true},
            status: {type: String, enum: ["available", "booked"], default: "available"}
          }
      ]
    }
  ],

  status: {
    type : String
  },
  airline: {
    type: Schema.Types.ObjectId, 
    ref: 'airlines',
    required: true,
  }  
});

export default mongoose.model("flights", flightSchema);
