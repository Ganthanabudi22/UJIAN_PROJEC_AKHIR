const db = require('./../1. database')


module.exports = {

    getAllCategory : (req,res)=>{
        var sql =  `select * from categorys;`
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    addCategory : (req, res)=>{
        console.log(req.body)
        var category = req.body.category;
        var sql = `select * from categorys where category='${category}'`
        db.query(sql, (err,result)=>{
                try{
                    if(err) throw err
                    if(result.length>0){
                        res.send('data category sudah ada')
                    }else{
                        var sql1 = `insert into categorys (category) value ('${category}');`
                            db.query(sql1, (err1, result1)=>{
                                if(err1) throw err1
                                var sql2 = `select * from categorys;`
                                db.query(sql2, (err2,result2)=>{
                                    res.send(result2)
                                })
                                
                            })}
            }
                catch(err){
                    res.send(err.message)
                }
            })
        
    },
    updateCategory : (req,res)=>{
        var id = req.params.id
        var category = req.body.category
        var sql =`select * from categorys where category='${category}'`
        db.query(sql, (err,result)=>{
            try{
                if(err) throw err
                if(result.length > 0){
                    res.send('Data Category Sudah ada')
                }else{
                    var sql1 = `update categorys set category ='${category}' where id = ${id};`
                    db.query(sql1,category, (err1,result1)=> {
                        if(err1) throw err1
                        var sql2 = `select * from categorys;`
                        db.query(sql2, (err2,result2)=>{
                            if (err2) throw err2
                            res.send(result2)
                        })
                    
                    })
                }
            } catch(err){
                res.send(err)
            }
        })
    },
    deleteCategory : (req,res)=>{
        var id = req.params.id
        var sql = `delete from categorys where id = ${id};`
        db.query(sql, (err , result)=>{
            if (err) throw err
            // res.send('BERHASIL DIHAPUS')
                var sql2 = `select * from categorys;`
                    db.query(sql2, (err2,result2)=>{
                    if (err2) throw err2
                        res.send(result2)
                    })
        })
    }



}