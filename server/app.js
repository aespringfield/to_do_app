// requires and globals
var express = require("express");
var bodyParser = require("body-parser");
var pg = require("pg");
var path = require("path");
var index = require("./routes/index.js");
var tasks = require("./routes/tasks.js");

var app = express();

// settings & uses

app.set("port", 4000);
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", index);
app.use("/tasks", tasks);

// spin up server
app.listen(app.get("port"), function(){
  console.log("Listening on port:", app.get("port"));
});
