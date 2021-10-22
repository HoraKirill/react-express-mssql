import {Router} from "express";
import userController from "../controllers/userController.js";
const router = Router()


router.post('/users', userController.getUsers)

router.post('/create', userController.userCreate)

router.post('/edit', userController.userEdit)

router.delete('/delete', userController.userDelete)


export default router;