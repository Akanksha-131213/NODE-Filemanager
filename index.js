import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fileRoutes from "./routes/route.js";
import Connection from "./database/db.js";
import dotenv from "dotenv";
const app = express();
const port = 8080;
app.use(cors());
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

app.use(bodyParser.json());

app.use("/", fileRoutes);

app.get("/", (req, res) => res.send("hello Express is running."));
app.get("*", (req, res) => res.send("Route not defined or exist."));
app.listen(port, () => console.log(`Sever Port Is http://localhost:${port}`));
