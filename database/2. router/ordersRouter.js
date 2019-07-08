const router = require('express').Router()
const {getAllDetil,getAllOrderAdmin,updateAdmin,uploadTransaction,updateAdminBatal,getAllByStatus,getAllByStatusAdmin} = require('./../3. controler').orderController
const transaction = require('./../4. helper/transaction')


router.get('/getAllOrderAdmin', getAllOrderAdmin)
router.get('/getAllByStatus', getAllByStatus)
router.get('/getAllByStatusAdmin/:status',getAllByStatusAdmin)
// router.get('/getAllStatus', getAllStatus)
// router.get('/getAllOrder/:user_name', getAllOrder)
router.get('/getAllDetail/:id_detail', getAllDetil)
router.put('/updateAdmin/:id', updateAdmin)
router.put('/updateAdminBatal/:id', updateAdminBatal)
router.put('/uploadTransaction/:id',transaction.single('edit'), uploadTransaction)









module.exports = router