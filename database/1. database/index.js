var mysql = require('mysql')


const db = mysql.createConnection({
    host :'localhost',
    user: 'root' ,
    password: '1234',
    database:'gym',
    port :3306

})

module.exports = db