const payRouter = require('express');
const {pay, checkPay, getStatus} = require("../controllers/payController");
const router = new payRouter;

router.post('/', pay);
router.post('/check/:id', checkPay);
router.post('/status', getStatus)

module.exports = router;