import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app=express()
app.use(express.json())

app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use(authRoutes);
app.use(productRoutes);

const startServer = async () => {
    try {
        await connectDB()
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    } catch (error) {
        console.error("Unable to start server:", error.message)
      
    }
}

startServer()