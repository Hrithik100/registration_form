import express from "express"
import { getAllUsersController, registrationController } from "../controller/userController.js";


const router = express.Router();

router.post("/registration", registrationController);

router.get("/all-users",getAllUsersController)

export default router;