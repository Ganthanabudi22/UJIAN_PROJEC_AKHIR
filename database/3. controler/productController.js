const db = require('./../1. database')
var fs = require('fs')


module.exports = {

    getAll : (req, res)=>{
        var sql =  `select p.id, p.id_produk, p.nama_produk, p.harga, p.discount, c.category, p.img, p.deskripsi from products p join categorys c on id_category = c.id;`
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    getById : (req,res)=>{
        var id = req.params.id
        var sql = `select * from products where id = ${id};`
        db.query(sql, (err, result)=>{
            try{
                if(err) throw {error:true, msg: 'ERROR DI API'}
                
                res.send(result)
            }
            catch(err){
                res.send(err)
            }
        })
    },
    getByCategory : (req,res) => {
        var category = req.params.category
        sql = `select p.id, p.id_produk, p.nama_produk, p.harga, p.discount, c.category, p.img, p.deskripsi from products p join categorys c on id_category = c.id where category = '${category}';`
        db.query(sql,(err,result)=>{
            try{
                if(err) throw err
                res.send(result)
            }
            catch(err){
                res.send(err)
            }
        })
    },
    addProduct : (req, res)=>{
        try{
            if(req.validation) throw req.validation
            if(req.file.size > 5*1024*1024) throw {error:true, msg: 'image too large'}
            // var data = {...JSON.parse(req.body.data), img : req.file.path}
    
            var newData = JSON.parse(req.body.data)
            newData.img = req.file.path
            var sql = 'insert into products set ? '
            db.query(sql,newData, (err, result)=>{
                        if(err) throw {error:true,msg:"error"}
                        res.send('BERHASIL MENAMBAH PRODUCT')
                    })
        
        }
        catch(err){
                res.send(err)
        }
    },
    updateProduct : (req,res) => {
        var id = req.params.id
        if(req.file){
            var data = JSON.parse(req.body.data)
            var dataNew = {id_produk : data.id_produk , nama_produk  : data.nama_produk, harga : data.harga, discount : data.discount, deskripsi : data.deskripsi, id_category : data.id_category}
            // UNTUK MENAMBAHKAN PROPERTI BARU DI OBJECT DATA
            // {product_name , product_price, product_image}
            dataNew.img = req.file.path
            var sql2 = `update products set? where id = ${id}`
            db.query(sql2, dataNew , (err,result) => {
                if(err) throw err
                res.send('Update Data Success')
                fs.unlinkSync(req.body.imageBefore)
            })
    
        }else{
            var sql = `update products set 
                        id_produk = '${req.body.id_produk}',
                        nama_produk = '${req.body.nama_produk}',
                        harga = ${req.body.harga},
                        discount = ${req.body.discount},
                        deskripsi = '${req.body.deskripsi}',
                        id_category = ${req.body.id_category} where id = ${id}` 
            db.query(sql, (err , result) => {
                if(err) throw err
                res.send('Edit Data Success')
            })
        }
    },
    deleteProduct :  (req,res)=>{
        var id = req.params.id
        var path = req.body.img
        sql= `select img from products where id=${id}`
        db.query(sql, (err, result)=>{
        try{
            if(err) throw err
            
            sql1=`delete from products where id=${id}`
            db.query(sql1, (err1,result1)=>{
                try{
                    if(err1) throw err1
                    fs.unlinkSync(path) 
                    
                    var sql2 =  `select p.id, p.id_produk, p.nama_produk, p.harga, p.discount, c.category, p.img, p.deskripsi from products p join categorys c on id_category = c.id;`
                    db.query(sql2, (err2, result2)=>{
                        try{
                            if(err2) throw err2
                            res.send(result2)
                        }
                        catch(err2){
                            res.send(err2.message)
                        }
                    })
                    }
                    catch(err1){
                        res.send(err1.message)
                    }
            })
        }catch(err){
            res.send(err.message)
        }
        })
    }



}