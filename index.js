import dotenv from 'dotenv'
dotenv.config();


import express, { urlencoded } from 'express'
import connectDB from './DB/databaseConnection.js';
import apiRoutes from './routes/apiRoutes.js'

const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/api',apiRoutes)

app.listen(PORT,async()=>{
    await connectDB()
    console.log(`Server is running at port http://localhost:${PORT}`)
})