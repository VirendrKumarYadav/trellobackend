const CardModal = require("../modal/CardModal")
const ListModal = require("../modal/ListModal")
const userModal = require("../modal/userModal")
const mongoose = require("mongoose");

const createCard = async (req, res) => {
    try {

        const fetchUser = await userModal.findOne({ _id: req.body.userID })

        const isListExist = await ListModal.findOne({ _id: req.body.listID })
        
        if (!isListExist && !fetchUser) {
            res.status(409).json({
                success: false,
                massage: "UserID or List ID does not exist, please enter the correct ID's!"
            })
        }

        var currentDate = new Date().toISOString().slice(0, 10);
        var currentTime = new Date().toLocaleTimeString();

        if (fetchUser) {
            const newCard = new CardModal({
                _id: new mongoose.Types.ObjectId(),
                userID: req.body.userID,
                listID: req.body.listID,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                createdDate: currentDate + " " + currentTime
            })
            
            await newCard.save();
            // console.log(newCard);
            const list=await ListModal.findByIdAndUpdate({ _id: req.body.listID }, {
               cards:[newCard._id]
            })
         console.log(list);
            res.json({
                success: true,
                massage: "Crad created sucessfully",
                newCard
            });
        } else {
            res.status(404).json({
                success: false,
                massage: "wrong userid, please enter the exist one!"
            });
        }

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.stack
        });
    }

}
const getCards = async (req, res) => {

    try {
        const cards = await CardModal.find();
        res.json({
            success: true,
            cards
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}
const getCardById = async (req, res) => {

    try {
        const cards = await CardModal.findOne({ _id: req.params.id });
        res.json({
            success: true,
            cards
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}
const removeCard = async (req, res) => {
    try {
        const listId = req.params.id;
        const listDetails = await CardModal.findOne({ _id: listId });
        if (listDetails) {
            await ListModal.deleteOne({ _id: listId })
            res.json({
                success: true,
                massage: "card deleted Sucessfully!"
            })
        } else {
            res.status(400).json({
                success: false,
                massage: "card id is incorrect!"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            res: error
        })
    }
}

const updateCard = async (req, res) => {
    try {
        const listId = req.params.id;

        const listDetails = await CardModal.findOne({ _id: listId });
        if (listDetails) {
            await ListModal.findByIdAndUpdate({ _id: listId }, req.body)
            res.json({
                success: true,
                massage: "Card updated Sucessfully!"
            })
        } else {
            res.status(400).json({
                success: false,
                massage: "Card id is incorrect!"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            res: error
        })

    }
}

module.exports = {
    createCard,
    getCards,
    removeCard,
    updateCard,
    getCardById
}