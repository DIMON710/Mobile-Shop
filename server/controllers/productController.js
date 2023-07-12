const productService = require("../services/productService.js");
const {Products} = require("../models/productsModel");
const fs = require('fs');
const FileService = require("../fileService.js");
const getAllPage = async (req, res) => {
    try {
        const {page} = req.params;
        const products = await productService.getAllPage(page);
        return res.send(products)
    } catch (e) {
        console.log(e);
        return res.send(e)
    }
}
const getAll = async (req, res) => {
    try {
        const products = await productService.getAll();
        return res.send(products)
    } catch (e) {
        console.log(e);
        return res.send(e)
    }
}
const getOne = async (req, res) => {
    try {
        const {id} = req.params;
        if (id) {
            const product = await productService.getOne(id);
            return res.send(product)
        }
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
const getSome = async (req, res) => {
        try {
            const {ids} = req.body;
            if (ids) {
                const products = await productService.getSome({id: ids});
                return res.send(products);
            }
            return res.sendStatus(404)
        } catch (e) {
            console.error(e)
           return res.send(e)
        }
}
const addNew = async (req, res) => {
    try {
        const {title, description, price} = req.body;
        if (title && description && !isNaN(price) && req.files.image) {
            const img = FileService.saveFile(req.files.image)
            const product = {title, description, price: Number(price), img}
            const newProduct = await productService.addNew(product);
            return res.send(newProduct);
        }
        return res.sendStatus(404)
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
const remove = async (req, res) => {
    try {
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
               return  res.sendStatus(204)
            } catch (e) {
                console.error(e)
               return  res.send(e)
            }
        }
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}

module.exports = {getAll, getAllPage, getOne, addNew, remove, getSome}