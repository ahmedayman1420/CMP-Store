// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/*
//==// Express is a minimal and flexible Node.js web application framework that
provides a robust set of features for web and mobile applications.

//==// Dotenv is a zero-dependency module that loads environment variables from a
.env file into process.env. Storing configuration in the environment separate from
code is based on The Twelve-Factor App methodology.
*/

const userRouter = require("./modules/users/routes/user-routes");
const categoryRouter = require("./modules/categories/routes/category-routes");
const productRouter = require("./modules/products/routes/product-routes");
const Connection = require("./Configration/configDB");
/*
//==// userRouter: is a router object that contains user module apis.
//==// Connection: function that used to connection with mongodb
*/

// ====== --- ====== > calling some functions < ====== --- ====== //
env.config();
Connection();
/*
//==// the config method takes a .env file path as an argument,
it parses it and sets environment vars defined in that file in process.env.

//==// call connection function of mongodb.
*/

// ====== --- ====== > Server APIs < ====== --- ====== //
app.use(cors()); // General Middelware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // General Middelware
app.use(express.urlencoded({ limit: "50mb", extended: true })); // General Middelware
app.use(userRouter); // user routes
app.use(categoryRouter); // category routes
app.use(productRouter); // product routes
/*
//==// To setup your middleware, you can invoke app.use(<specific_middleware_layer_here>) for every middleware 
layer that you want to add (it can be generic to all paths, or triggered only on specific path(s)
your server handles), and it will add onto your Express middleware stack. 
*/

// ====== --- ====== > Listen Server On Port < ====== --- ====== //
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT} !`);
});
/*
//==//The app.listen() function is used to bind and listen the connections on the specified host and port.
This method is identical to Node???s http.Server.listen() method. If the port number is omitted or is 0,
the operating system will assign an arbitrary unused port, which is useful for cases like automated tasks (tests, etc.).
*/
