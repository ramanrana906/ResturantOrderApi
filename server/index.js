require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./config/mongoose");
const bodyParser = require('body-parser');
//




app.use(bodyParser.urlencoded({ extended: true }));
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(__dirname + '/assets'));
app.use(express.json())
app.use(cors());
app.use("/", require("./routes/index"));
const port = process.env.PORT || 8000;

app.listen(port,()=> console.log(`Server is running on port ${port}`));