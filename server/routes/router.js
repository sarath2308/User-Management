import express from 'express'
import userController from '../controllers/userController.js'


const router=express.Router();


router.post('/api/auth/signup',userController.signup)
router.post('/api/auth/signin',userController.login)





export default router