import express from 'express'
import userController from '../controllers/userController.js'
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
const router=express.Router();


router.post('/api/user/auth/signup',userController.signup)
router.post('/api/user/auth/signin',userController.login)
router.post('/api/user/upload-profile', verifyToken, upload.single('profileImage'),userController.uploadImage)

router.get('/api/user/userData',verifyToken,userController.getUser)





export default router