import express from 'express'
import { SignUp } from '../controllers/userController'

const router = express.Router()

router.post('/signup', SignUp)

export default router
