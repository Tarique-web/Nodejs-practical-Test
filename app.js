const express = require('express');
var db = require("./config/dbconfig");
const router = express.Router();
const body = require("body-parser");

const app = express();

app.use(body.json())

app.use('/',router);

// base URL
app.use("/register", require("./routes/UserRegisterRout"));



app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})