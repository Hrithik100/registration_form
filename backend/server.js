import express from "express"
import colors from "colors"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"



dotenv.config()


const app = express()

app.use(cors())

connectDB()

app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/user',userRoutes)

app.get('/', (req,res)=>{
    res.send("<h1>Welcome to form submit</h1>")
})

const PORT = process.env.PORT || 8080


app.listen(PORT, () =>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${PORT}`)
})