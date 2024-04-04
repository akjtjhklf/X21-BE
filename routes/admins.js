const express = require("express");

const adminController = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.get("/",adminController.getUsersList)

adminRouter.post("/login", adminController.login);

adminRouter.post("/register",adminController.register);

adminRouter.put("/changepassword/:id" ,adminController.changePassword);

module.exports = adminRouter;