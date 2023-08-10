const LiqPay = require('../libraries/liqpay.js');
const payService = require('../services/payService.js');
const public_key = process.env.PUBLIC_KEY
const private_key = process.env.PRIVATE_KEY
const CLIENT = process.env.CLIENT_URL
const SERVER = process.env.SERVER_URL

const newOrder = async (req, res) => {
    try {
        const {amount, description, delivery, img, order_id, fullName, tel} = req.body;
        const newOrder = await payService.addNew({
            order_id,
            description,
            fullName,
            tel,
            currency: 'UAH',
            amount,
            status: 'receipt',
            date: Date.now(),
            delivery,
            img
        });
        console.log(newOrder)
        res.sendStatus(201);
    } catch (e) {
        console.error(e)
        res.send(e)
    }
}
const pay = async (req, res) => {
    try {
        const {amount, description, delivery, img, order_id, fullName, tel} = req.body;
        const liqpay = new LiqPay(public_key, private_key)
        const params = {
            action: 'pay',
            amount,
            currency: 'UAH',
            description,
            order_id,
            version: '3',
            server_url: `${SERVER}/pay/check/${order_id}`,
            result_url: `${CLIENT}/1`
        }
        const obj = liqpay.cnb_object(params);
        const newOrder = await payService.addNew({
            order_id,
            description,
            fullName,
            tel,
            currency: 'UAH',
            amount,
            status: 'processing',
            date: Date.now(),
            delivery,
            img
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
const filterOrders = async (req, res) => {
    try {
        const {params} = req.body;
        const {page} = req.params;
        let obj = {}
        params.map(el => {
            for (let key in el.value) {
                if (!obj[key]) {
                    obj[key] = el.value[key]
                } else {
                    delete obj[key]
                }
            }
        });
        const filteredOrder = await payService.filterOrders(obj, page);
        return res.send(filteredOrder)
    } catch (e) {
        console.log(e)
        res.send(e)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await payService.getAll()
        return res.send(orders)
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
const getStatus = async (req, res) => {
    try {
        const {order_id} = req.body;
        if (order_id) {
            const products = await payService.getStatus(order_id);
            return res.send(products.status);
        }
        return res.sendStatus(404)
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
const getOrders = async (req, res) => {
    try {
        const {page} = req.params;
        const orders = await payService.getPagination(page)
        return res.send(orders)
    } catch (e) {
        console.error(e)
        return res.send(e)
    }
}
module.exports = {pay, checkPay, getAllOrders, getOrders, changeOrder, getStatus, filterOrders, newOrder}