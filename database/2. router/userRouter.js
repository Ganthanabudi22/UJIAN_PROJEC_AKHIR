const router = require('express').Router()
const {getAllUser, getUserByUsername, getLogin, updateVerify, addUser} = require('./../3. controler').userController

router.get('/allUser', getAllUser)
router.get('/getAllUser/:user_name', getUserByUsername)
router.get('/login', getLogin)
router.get('/verify', updateVerify)
router.post('/addUser', addUser)


module.exports = router