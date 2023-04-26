const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user");
const Email = require("../models/email");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  getProfile: async (req, res) => {
    console.log(res.user.id.id)
    try {
      const getProfileById = await User.find({
        _id: res.user.id.id,
      }).select("name email phone");
      res.status(200).json(getProfileById);
    } catch (err) {
      res.json({ err });
    }
  },
  // getUserEmail: async(req, res) => {
  //   try {
  //     const findUserEmail = await User.find({_id: req.params.id})
  //     .populate('email')
  //     .exec()
  //     res.status(200).json(findUserEmail)
  //   } catch (err) {
  //     res.json({err})
  //   }
  // },
  updateUser: async (req, res) => {
    try {
      const paramsId = await parseInt(req.params.id);
      const { name, phone } = await req.body;
      const user = {
        name,
        phone,
      };
      const updateUser = await User.findOneAndUpdate(paramsId, user);
      res.json({ message: "user updated", updatedUser: updateUser });
    } catch (err) {
      res.json({ err });
    }
  },
  updateUserPassword: async (req, res) => {
    try {
      const paramsId = await parseInt(req.params.id);
      const { password } = await req.body;
      const user = {
        password,
      };
      const updateUser = await User.findOneAndUpdate(paramsId, user);
      res.json({ message: "user password change", updatedUser: updateUser });
    } catch (err) {
      res.json({ err });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user)
      if(!user){
        res.json({message: "user not found"})
      } else if (user.password === password) {
        res.json({ userId: user._id, match: true });
      } else if(user.password !== password){
        res.json({error: "username or password is wrong", match: false})
      }
    } catch (err) {
      res.json({ err: "something wrong maybe user or password is wrong" });
    }
  },
  requestotp: async (req, res) => {
    try {
      const { otp, id } = req.body;
      if (otp === "111111") {
        const token = await jwt.sign(
          {
            id,
          },
          "secret_key",
          {
            expiresIn: "6h",
          }
        );
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ err: "error wrong otp" });
      }
    } catch (err) {
      res.json({ err });
    }
  },
};
