const router = require('express').Router()
const {addToCart,getCart,updateCart,deleteCart,countCart,checkout,tampil} = require('./../3. controler').cartController

router.post('/addTocart', addToCart)
router.get('/getCart', getCart)
router.get('/getCount', countCart)
router.put('/updateCart/:id', updateCart)
router.delete('/deleteCart/:id', deleteCart)
router.post('/checkOut', checkout)
router.get('/tampil', tampil)






module.exports = router