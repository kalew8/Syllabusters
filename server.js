var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require ("body-parser");
var morgan = require("morgan");
var expressJwt = require("express-jwt");
var config = require("./config");
var port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected to the database!")
});

app.use("/user", require("./routes/user-route"));

app.use("/auth/change-password", expressJwt({secret: config.secret}));
app.use("/auth", require("./routes/auth-routes"));


app.use("/api", expressJwt({secret: config.secret}));

app.use("/api/course", require("./routes/course-route"));
app.use("/api/assignment", require("./routes/assignment-route"));

app.use("/admin", require("./routes/admin-route"));

app.listen(port, function(req, res) {
    console.log("This app is listening on " + port)
});