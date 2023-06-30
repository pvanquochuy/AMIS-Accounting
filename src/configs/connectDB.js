// get the client
import mysql from 'mysql2/promise'

// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'quochuy2k2',
    database: 'misa.hou2023_pvqhuy'
});


export default pool