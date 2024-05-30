const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");


const userSchema = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    list:{
        type:[mongoose.Types.ObjectId],
        require:false,
        default:[]
    }
   
}
module.exports = mongoose.model("users", userSchema);