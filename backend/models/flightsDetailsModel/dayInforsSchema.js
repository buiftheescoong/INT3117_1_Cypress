import mongoose from "mongoose";
const Schema = mongoose.Schema;


const dayInfors = new Schema({
    date :{
      type: String,
      required: true,
    },
    time : {
      type: String,
      required: true,
    }
 })

 export default dayInfors;