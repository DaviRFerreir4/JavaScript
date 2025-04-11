//import { Pool } from 'pg';
import pg from 'pg';
const { Pool } = pg;

export async function connect() {

    if (global.conection) return global.connection.connect();

    //console.log(process.env.CONNECTION_STRING);
    
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    console.log("Deve ter criado a piscina");
    
    const res = await client.query("SELECT * FROM usuarios;");
    console.log(res.rows[0].nome);
    client.release();
    
    global.connection = pool;
    return pool.connect();

}