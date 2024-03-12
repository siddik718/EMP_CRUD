import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connect } from "mongoose";
import router from "./routes/employee.routes.js";

const app = express();

// Configuration for env file.
config();
const PORT = process.env.PORT || 5000;
const DBURL = process.env.DBURL;

// MiddleWires.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes.
app.use("/api", router);

// Connect To Mongodb.
connect(DBURL)
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server Started at : ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
