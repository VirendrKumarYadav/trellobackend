const userModal = require("../modal/userModal")
const authSchema = require("../modal/Auth")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const userRgistration = async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const pass = req.body.password
    const hashedPassword = await bcrypt.hash(pass, 10);


    try {

        const newUser = new userModal({
            username: username,
            email: email,
            password: hashedPassword,
        })
        await newUser.save();
        res.json({
            success: true,
            massage: "User Sucessfully Resistered, Let's go to the Login Page!",


        });

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.message
        });
    }

};

const userLogin = async (req, res) => {
    try {
        const username = req.body.email;
        const password = req.body.password;

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

        //------------------------JWT --------------------------
        var passwordMatch = false;
        bcrypt.compare(password, userDetails.password, function (err, result) {
            if(result == true) {
                passwordMatch = true 
           
      
            const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200 * 24;
            const payload = {
                id: userDetails._id,
                name: userDetails.username,
                email: userDetails.email,
                exp: expiryDateTime,
                role: "admin"
            };
            // to generate toaken add payload and jwt secrate key
            const barearToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)
            // ---------------------------------------------------------------
            var currentDate = new Date().toISOString().slice(0, 10);
            var currentTime = new Date().toLocaleTimeString();

            const isLoggedIn =  authSchema.findOne({
                email: req.body.email,
            })
            if (isLoggedIn) {
                 authSchema.findOneAndUpdate({
                    email: username,
                    password: password,
                    jwtToken: barearToken
                })
            } else {
                const userAuth = new authSchema({
                    email: username,
                    password: password,
                    jwtToken: barearToken,
                    loggedin: currentDate + " " + currentTime
                })

                 userAuth.save();
            }


            // console.log(userAuth);
            res.json({
                success: true,
                massage: "User loggedin Sucessfully!",
                user: userDetails.username,
                email: userDetails.email,
                id: userDetails._id,
                token: barearToken
            });

        } else {
            res.status(404).json({
                success: false,
                massage: "User password is incorrect!",
            });
        }

        });

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
        const userAuth = await authSchema.findOne({
            email: req.body.email,
        })
        if (userAuth) {
            await authSchema.findOneAndDelete({
                email: req.body.email,
            })
        }

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

const getUserAuth = async (req, res) => {

    try {
        const userAuth = await authSchema.find()
        if (userAuth) {
            res.json({
                success: true,
                massage: "User auth details.",
                details: userAuth
            });
        } else {
            res.status(400).json({
                success: false,
                massage: "User auth details not present.",
                details: userAuth.stack
            });
        }


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
    getUserID,
    getUserAuth
}