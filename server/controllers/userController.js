import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const secret = 'test'

// sign up function
export const SignUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const registeredUser = await User.findOne({ email })

        if (registeredUser) {
            return res.status(400).json({
                message: 'User already exist'
            })
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 12)
        // first name to UCwords
        let fName = firstName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        })
        // last name to UCwords
        let lName = lastName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        })
        // full name with UCwords
        const name = fName + ' ' + lName

        // create user
        const result = await User.create({
            name, 
            email,
            password: hashedPassword,

        })

        // sign up token
        const token = jwt.sign({
            email: result.email,
            id: result._id
        }, secret, {
            expiresIn: '1h'
        })

        res.status(201).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'})
        console.log(error)
    }
}

// sign in function
export const SignIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const registeredUser = await User.findOne({ email })

        if (!registeredUser) {
            return res.status(404).json({ message: 'User doesnt exist' })
        }

        const correctPassword = await bcrypt.compare(password, registeredUser.password)

        // check if the password enters matches with the saved password
        if (!correctPassword) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // sign in token
        const token = jwt.sign({ 
            email: registeredUser.email, 
            id: registeredUser._id
        }, secret, {
            expiresIn: '1h'
        })

        res.status(200).json({ result: registeredUser, token })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'})
        console.log(error)
    }
}

