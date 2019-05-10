const router = require('express').Router()
const {getAllOrder,getAllDetil,getAllOrderAdmin,updateAdmin,uploadTransaction} = require('./../3. controler').orderController
const transaction = require('./../4. helper/transaction')


router.get('/getAllOrderAdmin', getAllOrderAdmin)
router.get('/getAllOrder/:user_name', getAllOrder)
router.get('/getAllDetail/:id_detail', getAllDetil)
router.put('/updateAdmin/:id', updateAdmin)
router.put('/uploadTransaction/:id',transaction.single('edit'), uploadTransaction)









module.exports = router