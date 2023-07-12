const payRouter = require('express');
const {pay, checkPay, getAllPay, getPay, changeOrder, getStatus} = require("../controllers/payController");
const router = new payRouter;

router.post('/', pay);
router.post('/check/:id', checkPay);
router.post('/status', getStatus)
router.get('/all', getAllPay)
router.get('/:page', getPay)
router.put('/order', changeOrder)

module.exports = router;