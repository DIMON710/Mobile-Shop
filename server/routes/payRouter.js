const payRouter = require('express');
const {pay, checkPay} = require("../controllers/payController");
const router = new payRouter;

router.post('/', pay);
router.post('/check/:id', checkPay);

module.exports = router;