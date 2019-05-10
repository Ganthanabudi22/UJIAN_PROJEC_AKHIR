var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var cors = require ('cors')
const cryp = require('crypto')


app.use(cors())
app.use(bodyParser.json('mysql'))
const port = 2000
const {userRouter,productRouter,categoryRouter,cartRouter,ordersRouter} = require('./2. router')


app.use(userRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use(cartRouter)
app.use(ordersRouter)




app.use('/uploads',express.static('uploads'))
app.use('/transaction',express.static('transaction'))


app.listen(port, ()=> console.log('aktif di port' + port))