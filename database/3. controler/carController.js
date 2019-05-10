const db = require('./../1. database')
const transforter = require ('./../4. helper/nodemailer')


module.exports = {
addToCart : (req,res)=> {
    var data = req.body
    var sql = `select * from cart where user_name_cart='${data.user_name_cart}' and id_produk_cart=${data.id_produk_cart}`
    db.query(sql, (err,result) => {
        try{
            if(result.length > 0){
                var qty = result[0].qty+data.qty
                var sql1=`update cart set qty=${qty} where user_name_cart='${data.user_name_cart}' and id_produk_cart=${data.id_produk_cart}`
                db.query(sql1, (err1, result1)=>{
                    if(err1) throw {error : true, msg : "Error saat tambah qty"}
                    res.send("success")
                })
            }else{
                var sql2 = `insert into cart set ?`
                db.query(sql2, data, (err2,result2) => {
                    if(err2) throw {error:true, msg: 'Gagal Di TambahKan'}
                    res.send("success")
                })
            }
        }
        catch(err){
            res.send(err)
        }
    })
},
getCart : (req,res)=>{
    var user_name_cart = req.query.user_name_cart
    var sql = `select cart.id, qty, id_produk_cart ,user_name_cart, p.nama_produk, p.harga, p.discount from cart
                join products p on id_produk_cart = p.id  where user_name_cart='${user_name_cart}'`
    db.query(sql, (err,result)=>{
        try{
            if(err) throw {error:true, msg: 'Database Erorr'}
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
countCart : (req,res)=>{
    var user_name_cart = req.query.user_name_cart
    var sql = `select count(*) as count from cart where user_name_cart='${user_name_cart}';`
    db.query(sql, (err,result)=>{
        try{
            if(err) throw {error:true, msg: 'Database Erorr'}
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
updateCart : (req,res) => {
    var id = req.params.id
    var qty = req.body.qty
    sql = `update cart set qty=${qty} where id = ${id};`
    db.query(sql, qty, (err,result) => {
        try{
            if(err) throw {error:true, msg: 'Database Erorr'}
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
deleteCart : (req,res) => {
    id = req.params.id
    sql = `delete from cart where id = ${id};`
    db.query(sql, (err, result) => {
        try { 
            if(err) throw err
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })
},
checkout: (req, res) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    var month = ['January', 'February', 'March', 'April', 'Mei', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember']
    var tgl = dd + ' ' + month[mm] + ' ' + yyyy + ' ' + today.getHours() + ':' + today.getMinutes()+ ':' +today.getSeconds()
    var data = {
        ...req.body,
        tgl
    }
    var sql = `insert into orders set ?`
    db.query(sql, data, (err, result) => {
        try {
            if (err) throw err
            var sql1 = `select cart.id, qty, id_produk_cart ,user_name_cart, p.nama_produk, p.harga, p.discount from cart
                        join products p on id_produk_cart = p.id  where user_name_cart='${data.user_name}'`
            db.query(sql1, (err1, result1) => {
                if (err1) throw err1
                console.log(result1)
                var sql2 = `select id from orders where user_name='${data.user_name}' and tgl='${data.tgl}'`
                db.query(sql2, (err2, result2) => {
                    if (err2) throw err2
                    var id = result2[0].id
                    var newArr = []
                    result1.map((val) => {
                        newArr.push(`(${id},${val.id_produk_cart},${val.qty}, ${val.harga-(val.harga*(val.discount/100))})`)
                    })
                    var sql3 = `insert into orderdetails (id_order, id_product, qty, total) VALUES ${newArr.join(',')}`
                    db.query(sql3, (err3, result3) => {
                        if (err3) throw err3
                    console.log('error')
                        var idArr = []
                        result1.map((val) => {
                            idArr.push(val.id)
                        })
                        var sql4 = `delete from cart where id in (${idArr.join(',')})`
                        db.query(sql4, (err4, result4) => {
                            if (err4) throw err4
                            var sql5 = `select email from users where user_name = '${data.user_name}';`
                            db.query(sql5, (err5, result5)=>{
                                if (err5) throw err5
                                var id = result2[0].id
                                var sql6 = `select total_belanja from orders where id = ${id};`
                                db.query(sql6,(err6,result6)=>{
                                    if (err6) throw err6
                                    var total = result6[0].total_belanja
                                    var email = result5[0].email
                                    var mailOptions = {
                                        from : 'COBA  <Purwadhika@Purwadhika.com>',
                                        to:'mbahsecond1993@gmail.com',
                                        subject: 'test nodemailer',
                                        html :`<h1> ANDA HARU BAYAR ${total} <a href='http://localhost:3000/buktiTrans/${id}'>BAYAR</a>  </h1>`
                                    }
                                        transforter.sendMail(mailOptions,(err7,result7)=>{
                                            if(err7) throw err7
                                            res.send('SILAKAN PERIKSA EMAIL ANDA')
                                        })
                                })
                            
                            
                            })
                            
                            

                        })
                    })
                })
            })
        } catch (err) {
            console.log(err)
        }
    })
},
tampil : (req,res)=>{
    user_name =req.query.user_name
    tgl = req.query.tgl
    var sql2 = `select id from orders where user_name='${user_name}'and tgl='${tgl}'`
    db.query(sql2, (err,result)=>{
        try { 
            if(err) throw err
            res.send(result)
        }
        catch(err){
            res.send(err)
        }
    })

}



}