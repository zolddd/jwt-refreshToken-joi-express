import express from "express";
import { config } from "dotenv";
import "./connection.js"
import authRoutes from "./routes/auth.js"
import refreshTokenRouter from "./routes/refreshToken.js"
import userRouter from "./routes/users.js"

const app= express();
config();
app.use(express.json());
const port=process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("listening on port "+port);
});

app.use("/api",authRoutes)
app.use("/api/refreshToken",refreshTokenRouter)
app.use("/api/users",userRouter)
