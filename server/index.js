require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://178.165.38.121:3000',
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
        app.listen(PORT, '192.168.31.200', () => {
            console.log(`Server starting on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
startApp()