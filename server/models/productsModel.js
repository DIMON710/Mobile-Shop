const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const Products = sequelize.define('products', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER},
    img: {type: DataTypes.STRING}
})
module.exports = {Products}