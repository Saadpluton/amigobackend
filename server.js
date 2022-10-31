/*****  Packages  *****/
import cors from "cors";
import express from "express";
import winston from "winston";

/*****  Modules  *****/
import connectDB from "#config/db";
import logger from "#utils/logger";
import routes from "#routes/index";
import { envConfig } from "#utils/env";
import BodyParser from "body-parser";

envConfig();
connectDB();
logger();

const app = express();
const PORT = process.env.PORT || 6000;

/*****  Middlewares  *****/
app.use(cors());
app.use(express.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('upload'));
routes(app);

app.listen(PORT, () => winston.info(`Server is Listening on port ${PORT}.`));
