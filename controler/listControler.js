const ListModal = require("../modal/ListModal")
const uniqid = require('uniqid');

const createList = async (req, res) => {
    try {

        const list = await ListModal({
            listname: req.body.listname,
            cards: req.body.card
        })
        await list.save();

        res.json({
            success: true,
            massage: "list created"
        });
    } catch (error) {
        res.json({
            success: true,
            massage: error.stack
        });
    }

}


module.exports = {
    createList
}