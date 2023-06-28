const ProductRouter = require('express');
const router = new ProductRouter();
const {getOne, getAll, addNew, remove} = require("../controllers/productController.js");
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/add-new', addNew);
router.delete('/remove/:id', remove);

module.exports = router;