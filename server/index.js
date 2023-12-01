const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ticketRoutes = require("./src/routes/ticketRoute");
const { errorHandler } = require("../server/src/middleware/globalerrorhandler");

app.use(express.json());
app.use(cors());

//endpoints
app.use("/api/v1/tickets", ticketRoutes);

app.use(errorHandler);

const startServer = async() => {
    try{
        await mongoose.connect("mongodb+srv://keanp16:4m8y9c1pv4p75@mytaskdb.ofqgvsg.mongodb.net/?retryWrites=true&w=majority");
        console.log("connected to mongodb");
        app.listen(4000, () => {
            console.log("connected to port 4000");
        });
    } catch (error) {
        console.error("cannot connect", error);
    }
};

startServer();
