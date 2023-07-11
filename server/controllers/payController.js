const LiqPay = require('../libraries/liqpay.js');
const uuid = require('uuid');
const payService = require('../services/payService.js');
let id = ''
const public_key = process.env.PUBLIC_KEY
const private_key = process.env.PRIVATE_KEY
const pay = async (req, res) => {
    try {
        const {amount, description, delivery} = req.body;
        const liqpay = new LiqPay(public_key, private_key)
        id = uuid.v4();
        const params = {
            action: 'pay',
            amount,
            currency: 'UAH',
            description,
            order_id: id,
            version: '3',
            server_url: `http://178.165.38.121:5000/pay/check/${id}`,
            result_url: "http://178.165.38.121:3000/1"
        }
        const obj = liqpay.cnb_object(params);
        const newOrder = await payService.addNew({
            order_id: id,
            description,
            currency: 'UAH',
            amount,
            status: 'processing',
            date: Date.now(),
            delivery,
        });
        console.log(newOrder)
        res.send(`https://www.liqpay.ua/api/3/checkout?data=${obj.data}&signature=${obj.signature}`)
    } catch (e) {
        console.error(e)
        res.send(e)
    }
}
const checkPay = (req, res) => {
    try {
        const {id} = req.params;
        const liqpay = new LiqPay(public_key, private_key);
        liqpay.api("request", {
            "action"   : "status",
            "version"  : "3",
            order_id: id
        }, async function( json ){
            console.log( json );
            const newOrder = await payService.changeOrder(id, {
                payment_id: json.payment_id,
                status: json.status,
                date: json.end_date,
            });
            console.log(newOrder);
            return res.sendStatus(200)
        });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
}

const changeOrder = async (req, res) => {
    try {
        const {id, complete} = req.body;
        const ChangedOrder = await payService.changeOrder(id, {complete});
        return res.sendStatus(201)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

const getAllPay = async (req, res) => {
    try {
        const orders = await payService.getAll()
        return res.send(orders)
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
const getPay = async (req, res) => {
    try {
        const {page} = req.params;
        const orders = await payService.getPagination(page)
        return res.send(orders)
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
module.exports = {pay, checkPay, getAllPay, getPay, changeOrder}