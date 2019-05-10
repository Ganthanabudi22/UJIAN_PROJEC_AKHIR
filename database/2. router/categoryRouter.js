const router = require('express').Router()
const {getAllCategory, addCategory, updateCategory, deleteCategory} = require('./../3. controler').categoryController

router.get('/getAllCategory', getAllCategory)
router.post('/addCategory', addCategory)
router.put('/updateCategory/:id', updateCategory)
router.delete('/deleteCategory/:id', deleteCategory)


module.exports = router