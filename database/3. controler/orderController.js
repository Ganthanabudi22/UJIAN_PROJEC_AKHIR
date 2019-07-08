const db = require('./../1. database')
var fs = require('fs')
const transforter = require ('./../4. helper/nodemailer')


module.exports = {
    
    getAllOrderAdmin : (req,res)=>{
        // var status = req.params.status
        var sql =  `select * from orders;`
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    getAllByStatus : (req,res)=>{
        var status = req.query.status
        var user_name = req.query.user_name
        // console.log('status '+status)
        var sql =  `select * from orders where user_name='${user_name}'`
        if(status!=='ALL'){
            sql+=` and status='${status}'`
        }
        // console.log(sql)
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    getAllByStatusAdmin : (req,res)=>{
        var status = req.params.status
        // console.log('status '+status)
        var sql =  `select * from orders`
        if(status!=='ALL'){
            sql+=` where status='${status}'`
        }
        // console.log(sql)
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    // getAllStatus : (req,res)=>{
        
    //     var sql =  `select status from orders group by status order by status;`
    //     db.query(sql, (err, result)=>{
    //         if(err) throw err
    //         res.send(result)
    //     })
    // },
    // getAllOrder : (req,res)=>{
    //     var user_name = req.params.user_name
    //     var sql =  `select * from orders where user_name = '${user_name}';`
    //     db.query(sql, (err, result)=>{
    //         if(err) throw err
    //         res.send(result)
    //     })
    // },
    getAllDetil : (req,res)=>{
        var id_detail = req.params.id_detail
        var sql =  `select p.nama_produk, od.qty, od.total from orderdetails od 
                    join products p on id_product = p.id where id_order = ${id_detail};`
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    updateAdmin : (req,res) => {
        var id = req.params.id
        sql = `update orders set status ='SEDANG DI PEROSES' where id = ${id};`
        db.query(sql,(err,result) => {
            try{
                if(err) throw {error:true, msg: 'Database Erorr'}
                res.send('/getAllOrderAdmin')
            }
            catch(err){
                res.send(err)
            }
        })
    }, 
    updateAdminBatal : (req,res) => {
        var id = req.params.id
        sql = `update orders set status ='BELUM DIBAYAR' where id = ${id};`
        db.query(sql,(err,result) => {
            try{
                if(err) throw {error:true, msg: 'Database Erorr'}
                // res.send('/getAllOrderAdmin')
                sql1 =`select user_name,id from orders`
                db.query(sql1, (err1, result1)=> {
                    if (err1) throw err1
                    var user_name = result1[0].user_name
                    // console.log(user_name)
                    sql2 = `select email from users where user_name ='${user_name}'`
                    db.query(sql2, (err2,result2)=>{
                        if (err2) throw err2
                        var id = result1[0].id
                        console.log(id)
                        var email = result2[0].email
                        var mailOptions = {
                            from : 'budiganthana22  <Purwadhika@Purwadhika.com>',
                            to:'mbahsecond1993@gmail.com',
                            subject: 'Biaya Yang Anda Transfer Salah',
                            html :`<h1> NOMINAL YANG ANDA KIRIMKAN SALAH <a href='http://localhost:3000/buktiTrans/${id}'>BAYAR</a>  </h1>`
                        }
                            transforter.sendMail(mailOptions,(err7,result7)=>{
                                if(err7) throw err7
                                res.send('SILAKAN PERIKSA EMAIL ANDA')
                            })
                    })
                })

            }
            catch(err){
                res.send(err)
            }
        })
    }, 
    uploadTransaction : (req,res) => {
        var id = req.params.id
        // var user_name = req.params.user_name
            if(req.validation) throw req.validation
            if(req.file.size > 5*1024*1024) throw {error:true, msg: 'image too large'}
            var data = { bukti :req.file.path, status:'SUDAH DIBAYAR'}
            var sql = `update orders set? where id = ${id}`
            db.query(sql, data , (err,result) => {
                if(err) throw err
                res.send('Update Data Success')
            })
    
        
    }


}