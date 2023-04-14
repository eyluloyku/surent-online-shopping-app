import express from "express";
import { config } from "dotenv";
import dbConnect from "./dbConnect.js";
import authRoutes from "./routes/auth.js";
import refreshTokenRoutes from "./routes/refreshToken.js";
import userRoutes from "./routes/users.js";
import {router} from "./routes/productsRoutes.js";
const app = express();

config();
dbConnect();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/refreshToken", refreshTokenRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", router);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
