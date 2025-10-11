import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/databaseConnection.js';
import apiRoutes from './routes/apiRoutes.js'
dotenv.config();
const app = express()
const PORT = process.env.PORT

app.use('/api',apiRoutes)

app.listen(PORT,async()=>{
    await connectDB()
    console.log(`Server is running at port http://localhost:${PORT}`)
})