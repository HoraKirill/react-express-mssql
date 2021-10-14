import express from 'express';
import * as path from "path";
import {requestHeader} from "./middlewares.js";
import serverRoutes from "./routes/index.js";
import sequelize from "./db.js";
import fileUpload from 'express-fileupload'
import User from "./models/models.js";

let __dirname = path.resolve();
let PORT = 3001;
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload({}))
app.use(requestHeader);
app.use(serverRoutes);

try {
    await sequelize.authenticate();
    await User.sync();
    app.listen(PORT, function () {
        console.log("Start server " + PORT + " ");
    });
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// app.get('/', function (req, res) {
//     res.render('index', { title: 'Main page', active: 'main' });
// });
// app.get('/table', function (req, res) {
//     res.render('table', { title: 'Table page', active: 'table' });
// });

