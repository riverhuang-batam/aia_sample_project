const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  getProfile: async (req, res) => {
    // console.log(res.user.id.email)
    try {
      const getProfileById = await User.find({
        email: res.user.id.email,
      }).select("name email phone");
      res.status(200).json(getProfileById);
    } catch (err) {
      res.json({ err });
    }
  },
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
      if (user.password === password) {
        res.json({ match: true });
      }
    } catch (err) {
      res.json({ err: "wrong password madge" });
    }
  },
  requestotp: async (req, res) => {
    try {
      const { otp, email } = req.body;
      if (otp === "111111") {
        const token = await jwt.sign(
          {
            email,
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
