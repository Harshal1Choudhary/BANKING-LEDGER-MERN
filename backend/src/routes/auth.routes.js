const express = require("express");
const authController = require("../controllers/auth.contoller");

const router = express.Router(); // express se ek method li hai udhaar. jo ki routing k liye use karenge.

/* POST /api/auth/register */
router.post("/register", authController.userRegisterController);
router.post("/login", authController.userLoginController);

module.exports = router;
