
import express from "express"
import dotenv from "dotenv"
import tnxRouter from './routes/transactionRoutes.js'
import cors from "cors"

dotenv.config()

const App = express()
App.use(cors({ origin: "http://localhost:3000" }))

const PORT = process.env.PORT || 1300

App.use(express.json())

// tnx route
App.use('/api/transaction', tnxRouter);

App.listen(PORT,()=>{
    console.log(`App running on port: ${PORT}`)
});


