var express = require("express");
const { verifyAuthToken } = require("../lib/auth");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.logIn);
router.get("/list", verifyAuthToken, UserController.listUsers);
router.get("/:id", verifyAuthToken, UserController.getUser);
router.put("/:id", verifyAuthToken, UserController.updateUser);
router.delete("/:id", verifyAuthToken, UserController.deleteUser);




module.exports = router;