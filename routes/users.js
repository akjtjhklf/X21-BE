const express = require("express");

const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/",userController.getUsersList)

userRouter.post("/login", userController.login);

userRouter.post("/register",userController.register);

userRouter.put("/changepassword/:id" ,userController.changePassword);

module.exports = userRouter;