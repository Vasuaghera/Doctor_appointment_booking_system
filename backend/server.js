import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import emailRoutes from './routes/emailRoutes.js'

// Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors(
  {
      origin : ["https://doctor-appointment-booking-system-2.onrender.com" , "https://doctor-appointment-booking-system-jfqf-nwnv7p473.vercel.app" , "https://doctor-appointment-booking-system-s.vercel.app" , 
                "doctor-appointment-booking-system-3.vercel.app" , "doctor-appointment-booking-system-4.vercel.app" , "https://doctor-appointment-booking-system-g.vercel.app"
] ,
      method : ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
      credentails : true
      }
)) ;

// API Endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use('/api', emailRoutes)

app.get("/", (req, res) => {
  res.send("Ready to go")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))
