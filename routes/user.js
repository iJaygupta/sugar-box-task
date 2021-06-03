const express = require("express");
const { verifyAuthToken } = require("../lib/auth");
const UserController = require("../controllers/UserController");
const { validateAjv } = require("../lib/validator");
const { registerUser, logIn, updateUser } = require("../schema/user");
var router = express.Router();

router.post("/register", validateAjv(registerUser), UserController.registerUser);
router.post("/login", validateAjv(logIn), UserController.logIn);
router.get("/list", verifyAuthToken, UserController.listUsers);
router.get("/:id", verifyAuthToken, UserController.getUser);
router.put("/:id", validateAjv(updateUser), verifyAuthToken, UserController.updateUser);
router.delete("/:id", verifyAuthToken, UserController.deleteUser);




module.exports = router;