import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classTypeSchema = new Schema({

    type :{
      type : String,
      required : true
    },

    extra_fee: {
      type : Number,
      required : true
    }, 

    include : {
        type: [String]
        
    },
  
    exclude : {
      type: [String]
    }
})

export default mongoose.model("classType", classTypeSchema);