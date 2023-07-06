const LiqPay = require('../services/liqpay.js');
const uuid = require('uuid');
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
        console.log('ok')
        const {id} = req.params;
        console.log(id)
        const liqpay = new LiqPay(public_key, private_key);
        liqpay.api("request", {
            "action"   : "status",
            "version"  : "3",
            order_id: `${id}`
        }, function( json ){
            console.log( json.status );
            res.send(json)
        });
    } catch (e) {
        console.error(e)
        res.send(e)
    }
}
module.exports = {pay, checkPay}