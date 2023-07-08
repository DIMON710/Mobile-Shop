const {Orders} = require('../models/payModel.js');

const addNew = async (order) => {
    try {
        return await Orders.create({...order})
    } catch (e) {
        console.error(e)
    }
}
const getAll = async () => {
    try {
        return await Orders.findAll({order: [['id', 'DESC']]})
    } catch (e) {
        console.error(e)
    }
}
const getPagination = async (page) => {
    try {
        page = page || 1
        const limit = 10;
        const offset = page * limit - limit
        return await Orders.findAndCountAll({order: [['id', 'DESC']], limit, offset})
    } catch (e) {
        console.error(e)
    }
}

module.exports = {addNew, getAll, getPagination}