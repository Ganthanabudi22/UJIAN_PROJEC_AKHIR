const db = require('./../1. database')
const transporter = require('./../4. helper/nodemailer')

module.exports = {
    getAllUser :  (req,res)=>{
        var sql = 'select * from users'
        db.query(sql, (err, result)=>{
            if(err) throw err
            res.send(result)
        })
    },
    getUserByUsername : (req,res)=>{
        var user_name = req.params.user_name
        var sql = `select * from users where user_name = '${user_name}'`
        db.query(sql, (err, result)=>{
            if(err) throw err
                res.send(result)
        })
    },

    getLogin : (req,res)=>{
        var user_name = req.query.user_name
        var password = req.query.password    
        var sql = `select * from users where user_name = '${user_name}' and password = '${password}'`
        db.query(sql, (err, result)=>{
            if(err) throw err
                res.send(result)
        })
    },

    addUser : (req, res)=>{
        var to = req.body.email
        var user_name = req.body.user_name;
        var nama_lengkap = req.body.nama_lengkap;
        var password = req.body.password;
        var email = req.body.email;
        var phone = req.body.phone;
        var mailOptions = {
            from : 'Purwadhika  <Purwadhika@Purwadhika.com>',
            to:to,
            subject: 'test nodemailer',
            html :`<h1> klik link ini untuk mengaktifkan <a href='http://localhost:2000/verify?user_name=${user_name}'>LOGIN</a> </h1>`
        }
        
        var sql = `insert into users (user_name, nama_lengkap, password, email, phone) value ('${user_name}', '${nama_lengkap}', '${password}', '${email}', ${phone} )`
        db.query(sql, (err, result)=>{
            if(err) throw err
            if(to){
                
                transporter.sendMail(mailOptions, (err, res1)=>{
                    if(err) throw err
                res.send('email berhasil dikirim')
        
                })
            }else{
                res.send('alamat email belum ada')
            }
        })
    
    },
    updateVerify : (req,res)=>{
        var user_name = req.query.user_name
        var sql = `update users set verived = 1 where user_name = '${user_name}'`
        db.query(sql, (err,result)=>{
            if(err) throw err
            res.send(`<a href='http://localhost:3000/login'>KLIK DISINI UNTUK LOGIN</a>`)
        })
    }



}