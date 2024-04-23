const ListModal = require("../modal/ListModal")
const userModal = require("../modal/userModal")
const mongoose = require("mongoose");

const createList = async (req, res) => {
    try {
        const fetchUser = await userModal
            .find({ _id: req.body.userID })

        const isListExist = await ListModal.findOne({ listname: req.body.listname })
        console.log(isListExist);
        if (isListExist) {
            res.status(409).json({
                success: false,
                massage: "Listname already Exist, Please enter unique name!"
            })
        }

        if (fetchUser) {
            const newList = new ListModal({
                userID: req.body.userID,
                listname: req.body.listname,
                cards:
                    req.body.card?.map(card => ({
                        _id: new mongoose.Types.ObjectId(),
                        title: card.title,
                        description: card.description,
                        status: card.status,
                    })),
            })
            await newList.save();

            res.json({
                success: true,
                massage: "list created sucessfully",
                newList
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
            massage: error
        });
    }

}

const getLists = async (req, res) => {

    try {
        const list = await ListModal.find();
        res.json({
            success: true,
            list
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

const removeList = async (req, res) => {
    try {
        const listId = req.params.id;
        const listDetails = await ListModal.findOne({ _id: listId });
        if (listDetails) {
            await ListModal.deleteOne({ _id: listId })
            res.json({
                success: true,
                massage: "list deleted Sucessfully!"
            })
        } else {
            res.status(400).json({
                success: false,
                massage: "list id is incorrect!"
            })
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            res:error
        })
    }
}

const updateList=async (req,res)=>{
try{
    const listId = req.params.id;
    
    const listDetails = await ListModal.findOne({ _id: listId });
    if (listDetails) {
        await ListModal.findByIdAndUpdate({ _id: listId },req.body)
        res.json({
            success: true,
            massage: "list updated Sucessfully!"
        })
    } else {
        res.status(400).json({
            success: false,
            massage: "list id is incorrect!"
        })
    }

} catch (error) {
    res.status(400).json({
        success: false,
        res:error
    })

}
}

module.exports = {
    createList,
    getLists,
    removeList,
    updateList
}