const productService = require("../services/productService.js");
const {Products} = require("../models/productsModel");
const fs = require('fs');
const FileService = require("../fileService.js");
const getAll = async (req, res) => {
    const products = await productService.getAll();
    return res.send(products)
}
const getOne = async (req, res) => {
    const {id} = req.params;
    if (id) {
        const product = await productService.getOne(id);
        return res.send(product)
    }
}
const addNew = async (req, res) => {
    const {title, description, price} = req.body;
    if (title && description && !isNaN(price) && req.files.image) {
        const img = FileService.saveFile(req.files.image)
        const product = {title, description, price: Number(price), img}
        const newProduct = await productService.addNew(product);
        return res.send(newProduct);
    }
    res.sendStatus(404)
}
const remove = async (req, res) => {
    const {id} = req.params;
    if (!isNaN(id)) {
        try {
            const product = await productService.getOne(id)
            const filePath = './images/' + product.img;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return;
                }
                console.log('Файл успешно удален');
            });
            await Products.destroy({where: {id}});
            res.sendStatus(204)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }
}
module.exports = {getAll, getOne, addNew, remove}