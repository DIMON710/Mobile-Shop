const payRouter = require('express');
const {pay, checkPay, getAllPay, getPay} = require("../controllers/payController");
const router = new payRouter;

router.post('/', pay);
router.post('/check/:id', checkPay);
router.get('/all', getAllPay)
router.get('/:page', getPay)

module.exports = router;