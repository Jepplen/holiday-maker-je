const express = require("express");
const dotenv = require("dotenv");
const corse = require("cors");
const connectDB = require("./config/db");
const { routers } = require("./routes/index");

// Load config
dotenv.config({ path: "./config/config.env" });

// Db connection
connectDB();

const app = express();

// Body parser
app.use(corse());
app.use(express.json());

routers.forEach((router) => app.use("/api/", router));

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
