const {Products} = require("../models/productsModel");

const getAll = async () => {
    return await Products.findAndCountAll()
}
const getOne = async (id) => {
    if (id) {
        return await Products.findOne({where: {id}});
    }
}
const addNew = async (product) => {
    return await Products.create({...product})
}

module.exports = {getAll, getOne, addNew}