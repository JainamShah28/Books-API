import mysql from 'mysql';
import dotenv from 'dotenv';
import util from 'util';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB    
}),
    query = util.promisify(connection.query).bind(connection);

export { connection, query };