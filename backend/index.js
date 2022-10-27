const express = require("express");
const cors = require("cors");
const UserRouter = require("./router/UserRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", UserRouter);

app.listen("5000", () => console.log("Server up and running ...."));
