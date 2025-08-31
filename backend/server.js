import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./database/db.js";
import usersRoute from "./Routes/users.route.js";
import adminRoute from "./Routes/admin.route.js";
import postRoute from "./Routes/posts.route.js";
import authRoute from "./Routes/auth.route.js";

dotenv.config();
const app = express();

app.use(morgan("common"));
app.use(
  cors({
    origin: ["http://localhost:7070", "http://dev.local"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT;

app.use("/api/users", usersRoute);
app.use("/api/admin", adminRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`server is running at port :=> ${port}`);
  connectDB();
});
