import express from 'express';
import * as path from "path";
import {requestHeader} from "./middlewares.js";
import serverRoutes from "./routes/index.js";
import sequelize from "./db.js";
import fileUpload from 'express-fileupload'
import User from "./models/UserModel.js";
import config from "./config.js";

let app = express();

app.use(express.static(path.resolve(config.__dirname, config.imgPath)));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload({}))
app.use(requestHeader);
app.use(serverRoutes);

try {
    await sequelize.authenticate();
    await User.sync();
    app.listen(config.PORT, function () {
        console.log("Start server " + config.PORT + " ");
    });
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


