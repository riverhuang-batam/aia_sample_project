const emailController = require("../controllers/emailController");

const express = require("express"),
  userController = require("../controllers/userController"),
  checkToken = require('../middleware/checkToken'),

/**


/**
 * @swagger
 * /getprofile/{id}:
 *  get:
 *    summary: get by id profile after login
 *    tags: [Profile]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: the user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *         description: get the login user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: the profile was not found
 *       500:
 *         description: some error happened    

 */
router = express.Router();
// router.get("/", homeController.home);
router.get("/getprofile/:id", checkToken, userController.getProfile)
router.post("/sendotp", userController.requestotp)
router.post("/login", userController.login)
router.patch("/updateuser/:id", userController.updateUser)
router.patch("/updateuserpassword/:id", checkToken, userController.updateUserPassword)
router.get("/getemailbyuserid/:id", checkToken, emailController.getEmailByUserId)
router.post("/createemail/", checkToken, emailController.createEmailTemplateByUserId)
router.patch("/updateemail/:id", checkToken, emailController.updateEmailTemplate)
router.delete("/deleteemail/:id", checkToken, emailController.deleteEmailTemplate)
module.exports = router;
