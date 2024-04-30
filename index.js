const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors')
const userRoute = require("./routes/userRoute");
const listRoute =require("./routes/listRoute")
const cardRoute =require("./routes/CardRouter")
const app = express();
app.use(cors())
app.options('*', cors())
//----------------------- DOT-ENV ----------------------- 
dotenv.config();
// --------------------Rate Limiter -----------------------
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per window
// });
// app.use(limiter);


// --------------------DB Connect ------------------------------
if (process.env.SERVER=="LOCAL") {
    mongoose
      .connect(process.env.DB_LOCAL)
    .then(() => {
      console.log("LOCAL Database Connected Successully.");
    })
    .catch((err) => {
      console.log("Database Connected failed ", err);
    });
  } else {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3qnwaw3.mongodb.net/Trello`
    )
     .then(() => {
      console.log("REMOTE Database Connected Successully.");
    })
    .catch((err) => {
      console.log("Database Connected Failed ", err);
    });
  }

app.use(express.json());
app.use("/api/v1/user/",userRoute);
app.use("/api/v1/list/",listRoute);
app.use("/api/v1/card/",cardRoute);

app.listen(process.env.PORT, () => {
  console.log("listening on "+process.env.PORT);
});