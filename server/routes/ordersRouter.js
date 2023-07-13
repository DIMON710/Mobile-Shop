const ordersRouter = require('express');
const {getAllOrders, getOrders, changeOrder, filterOrders} = require("../controllers/payController");
const router = new ordersRouter;

router.get('/all', getAllOrders)
router.get('/:page', getOrders)
router.put('/order', changeOrder)
router.post('/filter', filterOrders)

module.exports = router;