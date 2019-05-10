const db = require('./../1. database')
var fs = require('fs')

module.exports = {
    getAllOrderAdmin : (req,res)=>{
        var sql =  `select * from orders;`
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    getAllOrder : (req,res)=>{
        var user_name = req.params.user_name
        var sql =  `select * from orders where user_name = '${user_name}';`
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
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
    uploadTransaction : (req,res) => {
        var id = req.params.id
        var user_name = req.params.user_name
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