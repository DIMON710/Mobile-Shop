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
const getStatus = async (order_id) => {
    try {
        return await Orders.findOne({where: {order_id}})
    } catch (e) {
        console.error(e)
    }
}
const getPagination = async (page) => {
    try {
        page = page || 1
        const limit = 10;
        const offset = page * limit - limit
        const ids = await Orders.findAll()
        console.log(ids)
        return await Orders.findAndCountAll({order: [['date', 'DESC']], limit, offset})
    } catch (e) {
        console.error(e)
    }
}
const changeOrder = async (id, params) => {
    try {
        return await Orders.update({...params}, {where: {order_id: id}});
    } catch (e) {
        console.error(e)
    }
}

module.exports = {addNew, getAll, getPagination, changeOrder, getStatus}