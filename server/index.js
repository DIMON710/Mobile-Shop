require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/productRouter.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use(fileUpload({}));
app.use('/products', router);


app.get('/', (req, res) => {
    res.send('<h1>Привет</h1>');
})


const startApp = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server starting on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
startApp()