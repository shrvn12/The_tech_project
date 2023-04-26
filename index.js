const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { fileRouter } = require("./file.router");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json());

app.set('view engine','hbs');

app.get("/",async (req, res) => {
  // res.sendFile(__dirname+'/views/index.html');
  res.render('index');
});

app.use("/ttp",userRouter);
app.use('/',fileRouter);
app.use("/ttp/products",productRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log("error while connecting to server");
    console.log(error);
  }
  console.log(`server is running at ${process.env.port}`);
});
