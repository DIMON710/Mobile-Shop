const {Products} = require("../models/productsModel");

const getAll = async () => {
    return await Products.findAndCountAll()
}
const getAllPage = async (page) => {
    if (isNaN(page) || page < 1) {
        page = 1
    }
    const limit = 4;
    const offset = page * limit - limit
    return await Products.findAndCountAll({limit, offset})
}
const getOne = async (id) => {
    if (id) {
        return await Products.findOne({where: {id}});
    }
}
const getSome = async (ids) => {
    if (ids) {
        return await Products.findAll({where: {id: ids}});
    }
}
const addNew = async (product) => {
    return await Products.create({...product})
}

module.exports = {getAll, getAllPage, getOne, getSome, addNew}