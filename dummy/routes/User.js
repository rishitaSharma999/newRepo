// Import the required modules
const express = require("express")
const router = express.Router()

//In Express.js, a router is an instance of the express.Router class, which is a mini-application that can be used to handle HTTP requests.

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

//const { auth } = require("../middlewares/auth")

// Routes for Login, Signup, and Authentication


// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

                                

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router