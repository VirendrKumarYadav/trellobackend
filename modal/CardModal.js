const mongoose = require("mongoose")

const createCard = {

    userID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    listID: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
}
module.exports = mongoose.model("cards", createCard);