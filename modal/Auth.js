const mongoose = require("mongoose");



const authSchema = {

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    jwtToken: {
        type: String,
        default: "",
        require: true

    },
    loggedin: {
        type: String,
        default: "",
        require: true

    }
}

module.exports = mongoose.model("auth", authSchema);