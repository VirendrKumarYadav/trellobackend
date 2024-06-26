const mongoose = require("mongoose")

const createList = {

    userID: {
        type: mongoose.Types.ObjectId,
        required: true,

    },
    listname: {
        type: String,
        required: true,
        unique: true
    },
    cards: {
        type: [ mongoose.Types.ObjectId],
        required: false,
        default: [],
    },
    createdDate: {
        type: String,
        required: true,
    },
}
module.exports = mongoose.model("list", createList);