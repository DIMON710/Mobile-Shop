require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index.js');
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT = process.env.CLIENT_URL
app.use(cors({
    origin: CLIENT,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/images', express.static('images'));
app.use(fileUpload({}));
app.use('/', router);


app.get('/', (req, res) => {
    res.send('<h1>Привет</h1>');
})


const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, '192.168.0.223', () => {
            console.log(`Server starting on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
startApp()