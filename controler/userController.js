const userModal = require("../modal/userModal")
const bcrypt = require("bcrypt")
const rateLimit = require('express-rate-limit');

const jwt=require("jsonwebtoken")


const userRgistration = async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const pass = req.body.password
    const encrptrdPass = bcrypt
        .hash(pass, 10)
        .then(hash => {
            userHash = hash
            console.log('Hash ', hash)
        })
        .catch(err => console.error(err.stack))

    try {

        const newUser = new userModal({
            username: username,
            email: email,
            password: pass
        })
        await newUser.save();
        res.json({
            success: true,
            massage: "User Sucessfully Resistered, Let's go to the Login Page!"
        });
    } catch (error) {
        res.json({
            success: false,
            massage: error.message
        });
    }

};

const userLogin = async (req, res) => {
    try {
        const username = req.body.email;
        const password = req.body.password;
        console.log(username, password);

        const userDetails = await userModal.findOne({
            $or: [
                {
                    username: username
                }, {
                    email: username
                }
            ]
        })

        if (!userDetails) {
            res.status(404).json({
                success: true,
                massage: "Username is incorrect!",
                bearer: bearer
            });
        }

        console.log(userDetails);
        //------------------------JWT --------------------------
        if (password === userDetails.password) {
            const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200;
            const payload = {
                id: userDetails._id,
                name: userDetails.firstname,
                email: userDetails.email,
                exp: expiryDateTime,
                role:"admin"
            };
            // to generate toaken add payload and jwt secrate key
            const barearToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)
            // ---------------------------------------------------------------
            console.log(userDetails);


            res.json({
                success: true,
                massage: "User login Sucessfully!",
                token: barearToken
            });
        }else{
            res.status(404).json({
                success: false,
                massage: "User password is incorrect!",
            });
        }

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: "User unable to login ,try again!",
            stack: error.stack
        });
    }

}

const userLogout = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        res.json({
            success: true,
            massage: "User Logout Sucessfully !"
        });
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to logout Session !"
        });
    }

}

const getUserID = async (req, res) => {
    try {
        const userDetails = await userModal.find({
            $or: [
                {
                    username: req.body.username
                }, {
                    email: req.body.email
                }
            ]
        })
        res.json({
            success: true,
            massage: "User details",
            details: userDetails

        });
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to find the details!"
        });
    }
}
module.exports = {
    userRgistration,
    userLogin,
    userLogout,
    getUserID
}