// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const users = require("../model/user-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > User Methods < ====== --- ====== //

/*
//==// signUp: is the logic of '/signup' api that used to create new user with (name, email, password, age) fields.
the response of this function in success (Sign up Successfully), in failure (show error message).
*/
const signUp = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;

    const oldUser = await users.findOne({ email, isDeleted: false });
    if (!oldUser) {
      if (password === confirmPassword) {
        const newUser = new users({ name, email, password });
        const data = await newUser.save();

        var token = jwt.sign(
          {
            data: { name: data.name, email: data.email, role: data.role },
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          process.env.ENCRYPT_KEY
        );

        res.status(StatusCodes.CREATED).json({
          Message: "Sign up Successfully",
          payload: { token, user: newUser },
        });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ Message: "Password not matched confirm passwords" });
      }
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ Message: "Email is Already Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

/*
//==// signin: is the logic of '/signin' api that used to sign in to website.
the response of this function in success (Sign in Successfully), in failure (show error message).
*/
const signIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    const oldUser = await users.findOne({ email, isDeleted: false });
    if (oldUser) {
      let cdate = Date.now();
      let match = bcrypt.compare(
        password,
        oldUser.password,
        function (err, result) {
          if (result) {
            var token = jwt.sign(
              {
                data: {
                  name: oldUser.name,
                  email: oldUser.email,
                  role: oldUser.role,
                },
                exp: Math.floor(cdate / 1000) + 60 * 60,
              },
              process.env.ENCRYPT_KEY
            );
            res.status(StatusCodes.OK).json({
              Message: "Sign in Successfully",
              payload: { token, user: oldUser },
            });
          } else {
            res
              .status(StatusCodes.BAD_REQUEST)
              .json({ Message: "Incorrect Password !" });
          }
        }
      );
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ Message: "User Not Found !" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};



// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  signUp,
  signIn,
};