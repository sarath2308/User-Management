import express from 'express'
import adminController from '../controllers/adminController.js'
import { verifyAdminToken } from '../middleware/adminAuth.js'
const router=express.Router()

router.post('/auth',adminController.signin)
router.get('/users',verifyAdminToken,adminController.getUsers)
router.post('/add',verifyAdminToken,adminController.addUser)
router.put('/edit/:id',verifyAdminToken,adminController.editUser)
router.delete('/delete/:id',verifyAdminToken,adminController.deleteUser)


export default router