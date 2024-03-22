var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// Importing route modules
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var apiRouter = require("./routes/api");
var docsRouter = require("./routes/docs");

// Create a new express instance
var app = express();

// Set up and mount middleware - processes the request before reaching the final response handlers
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files
app.use(express.static(path.join(__dirname, "views")));
app.use(express.static(path.join(__dirname, "public")));

// Configure CORS rules (Cross Origin Resourse Sharing)
app.use(
  cors({
    origin: [process.env.REACT_APP_URI],
  })
);

// Mount the differnt routes to handle the specified request enpoint
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/docs", docsRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

module.exports = app;

// ? Middleware
/** 
   Think of middleware as a series of steps or checkpoints that the request goes through before reaching its final destination. Each middleware function has access to the request object, the response object, and the next middleware function in the application's request-response cycle.
   */
