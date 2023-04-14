
// const swaggerDocument = require('./swagger.json');
const express = require("express"),
  userController = require("./controllers/userController"),
  checkToken = require('./middleware/checkToken'),
  
router = express.Router();
// router.get("/", homeController.home);
router.get("/getprofile", checkToken, userController.getProfile)
router.post("/sendotp", userController.requestotp)
router.post("/login", userController.login)
router.patch("/updateuser/:id", userController.updateUser)
router.patch("/updateuserpassword/:id", userController.updateUserPassword)
module.exports = router;
