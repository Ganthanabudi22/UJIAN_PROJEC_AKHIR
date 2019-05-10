const router = require('express').Router()
const {getAll, getById, addProduct, updateProduct, deleteProduct} = require('./../3. controler').productController
const upload = require('./../4. helper/upload')

router.get('/getAllProduct', getAll)
router.get('/getProductBy/:id', getById)
router.post('/addProduct',upload.single('image'), addProduct)
router.put('/updateProduct/:id', upload.single('edit'), updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)


module.exports = router