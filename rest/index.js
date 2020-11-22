var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const routes = require('./routes/routes.js')(app, fs);

app.listen(3000, () => {
 console.log("Server running on port 3000");
});



