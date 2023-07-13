const Router = require('express');
const productRouter = require('./productRouter.js');
const payRouter = require('./payRouter.js');
const ordersRouter = require('./ordersRouter.js');
const router = new Router();

router.use('/products', productRouter);
router.use('/pay', payRouter);
router.use('/orders', ordersRouter);

module.exports = router;