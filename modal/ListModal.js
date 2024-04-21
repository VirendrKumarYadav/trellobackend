const mongoose =require("mongoose");

const createList={

    listname: {
        type: String,
        required: true,
        unique: true
    },
    cards: {
        type: [],
        required: true,
        default:[]
    },
}
module.exports = mongoose.model("lists", createList);
