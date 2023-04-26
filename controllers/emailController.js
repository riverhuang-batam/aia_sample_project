const mongoose = require("mongoose");
const Email = require("../models/email");
const User = require("../models/user")
module.exports = {
  getEmailById: async (req, res) => {
    try {
      const findEmail = await Email.find({_id: req.params.id})
      .populate({path: 'createByUser', select: '_id email name phone'})
      .exec()
      res.status(200).json(findEmail)
    } catch (err) {
      res.json({ err: err });
    }
  },
  getEmailByUserId: async (req, res) => {
    try {
      const findEmail = await Email.find({createByUser: req.params.id})
      .populate({path: 'createByUser', select: '_id email name phone'})
      .exec()
      res.status(200).json(findEmail)
    } catch (err) {
      res.json({ err: err });
    }
  },
  createEmailTemplateByUserId: async (req, res) => {
    try {
      const email = new Email({
        _id: new mongoose
              .Types
              .ObjectId(),
              body: req.body.body,
              createByUser: req.body.userId
      })
      const newEmail = email.save()
      res.status(200).json(newEmail)
    } catch (err) {
      res.json({ err });
    }
  },
  updateEmailTemplate: async (req, res) => {
    try {
      const {body} = await req.body
      const paramsId = await parseInt(req.params.id);
      const email = await {
        body
      };
      console.log(paramsId)
      const updateEmail = await Email.find({_id: req.params.id}).updateMany({body: email.body}) 
      res.status(200).json({ message: "email updated",  updateEmail});
    } catch (err) {
      res.json({ err });
    }
  },
  deleteEmailTemplate: async (req, res) => {
    try {
      const removeEmail = await Email.findOneAndDelete({_id: req.params.id})
      console.log('try to delete') 
      res.status(200).json({ message: "email deleted"});
    } catch (err) {
      res.json({ err });
    }
  }
};
