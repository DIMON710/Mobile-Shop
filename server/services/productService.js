const {Products} = require("../models/productsModel");

const getAll = async () => {
    try {
        return await Products.findAndCountAll()
    } catch (e) {
        console.error(e)
    }
}
const getAllPage = async (page) => {
    try {
        if (isNaN(page) || page < 1) {
            page = 1
        }
        const limit = 4;
        const offset = page * limit - limit
        return await Products.findAndCountAll({limit, offset})
    } catch (e) {
        console.error(e)
    }
}
const getOne = async (id) => {
    try {
        if (id) {
            return await Products.findOne({where: {id}});
        }
    } catch (e) {
        console.error(e)
    }
}
const getSome = async (params) => {
    try {
        if (params) {
            return await Products.findAll({where: {...params}});
        }
    } catch (e) {
        console.error(e)
    }
}
const addNew = async (product) => {
    try {
        return await Products.create({...product})
    } catch (e) {
        console.error(e)
    }
}

module.exports = {getAll, getAllPage, getOne, getSome, addNew}