import express from "express"
import mongoose from "mongoose" 
import cors from "cors"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes"

// mongodb connection url
const DB_URL = "mongodb+srv://LJ1Xic5f1sUSER:A1dCZrLJ1Xic5f1s@cluster0.sgwatzg.mongodb.net/?retryWrites=true&w=majority"
// port
const PORT = "5000"

const app = express()

app.use(morgan('dev'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// routes (localhost:5000/users/signup)
app.use('/users', userRoutes)

// connect to mongo db
mongoose
    .connect(DB_URL)
    .then(() => {
        // fire up server
        app.listen(PORT, () => {
            console.log(`Connected to DB and Server running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log('Failed to connect to the db ', error.message)
    })

