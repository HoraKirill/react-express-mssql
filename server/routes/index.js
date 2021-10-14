import {Router} from "express";
import userController from "../controllers/userController.js";
const router = Router()


router.post('/users', userController.getUsers)

router.post('/create', userController.newUser)

router.post('/edit', userController.editUser)

router.delete('/delete', userController.deleteUser)


export default router