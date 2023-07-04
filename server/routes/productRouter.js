const ProductRouter = require('express');
const router = new ProductRouter();
const {getOne, getAll, getAllPage, addNew, remove, getSome} = require("../controllers/productController.js");
router.get('/', getAll);
router.get('/page/:page', getAllPage);
router.get('/:id', getOne);
router.post('/basket', getSome);
router.post('/add-new', addNew);
router.delete('/remove/:id', remove);

module.exports = router;