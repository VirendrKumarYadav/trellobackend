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
        type: [{
            _id: false,
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
        }],
        required: false,
        default: [],
    }
}
module.exports = mongoose.model("list", createList);