const {Products} = require("../models/productsModel");
const products = [
    {
        id: 0,
        title: 'Xiaomi Redmi Note 10 Pro',
        description: '6/128 GB, 6.67" 2400x1080, Qualcomm Snapdragon 732G + Adreno 618, камера 108Мп/16мп, 5020мАч',
        price: 9999,
        img: 'http://localhost:3000/images/Xiaomi Redmi Note 10 Pro.jpg'
    },
    {
        id: 1,
        title: 'Xiaomi Redmi 10',
        description: '4/64 GB Blue',
        price: 6999,
        img: 'http://localhost:3000/images/Xiaomi Redmi 10.jpg'
    },
    {
        id: 2,
        title: 'Xiaomi Redmi Note 11',
        description: '4/64 GB',
        price: 7999,
        img: 'http://localhost:3000/images/Xiaomi Redmi Note 11.jpg'
    },
    {
        id: 3,
        title: 'Xiaomi 12 5G',
        description: '8/128GB Blue',
        price: 19999,
        img: 'http://localhost:3000/images/Xiaomi 12 5G.jpg'
    },
];
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