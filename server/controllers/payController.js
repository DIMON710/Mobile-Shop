const LiqPay = require('../libraries/liqpay.js');
const uuid = require('uuid');
const payService = require('../services/payService.js');
let id = ''
const public_key = process.env.PUBLIC_KEY
const private_key = process.env.PRIVATE_KEY
const pay = (req, res) => {
    try {
        const {amount, description} = req.body;
        const liqpay = new LiqPay(public_key, private_key)
        id = uuid.v4();
        const params = {
            action: 'pay',
            amount,
            currency: 'UAH',
            description,
            order_id: `${id}`,
            version: '3',
            server_url: `http://178.165.38.121:5000/pay/check/${id}`,
            result_url: "http://178.165.38.121:3000/1"
        }
        const obj = liqpay.cnb_object(params);
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
            order_id: `${id}`
        }, async function( json ){
            console.log( json );
            const newOrder = await payService.addNew({
                payment_id: json.payment_id,
                order_id: json.order_id,
                description: json.description,
                currency: json.currency,
                amount: json.amount,
                status: json.status
            })
            console.log(newOrder);
            return res.sendStatus(200)
        });
    } catch (e) {
        console.error(e)
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
module.exports = {pay, checkPay, getAllPay, getPay}