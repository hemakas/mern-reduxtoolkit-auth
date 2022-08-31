import express from 'express'
import { SignUp, SignIn } from '../controllers/userController'

const router = express.Router()

// sign up
router.post('/signup', SignUp)

// sign in
router.post('/signin', SignIn)

export default router
