const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const Orders = sequelize.define('orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    payment_id: {type: DataTypes.BIGINT, unique: true},
    order_id: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING},
    currency: {type: DataTypes.STRING},
    amount: {type: DataTypes.INTEGER},
    status: {type: DataTypes.STRING},
    date: {type: DataTypes.BIGINT},
    complete: {type: DataTypes.BOOLEAN, defaultValue: false},
    delivery: {type: DataTypes.STRING},
    img: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    fullName: {type: DataTypes.STRING},
    tel: {type: DataTypes.STRING},
})

module.exports = {Orders}
