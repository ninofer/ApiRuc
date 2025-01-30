// dbHandler.js
import sql from 'mssql';
import dotenv from 'dotenv';
/**
 * Ejecuta una consulta SQL o un procedimiento almacenado.
 * @param {string} query - Consulta SQL o nombre del procedimiento.
 * @param {Array} inputs - Parámetros de entrada (opcional).
 * @param {Array} outputs - Parámetros de salida (opcional).
 * @param {boolean} isStoredProcedure - Indica si es un procedimiento almacenado.
 * @returns {Promise} Resultado de la consulta.
 */

//Habilitamos las variables de ambiente
dotenv.config();

const config = {
    server: process.env.DB_IP,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    options: {
        encrypt: false,               // Cifra la conexión
        trustServerCertificate: true // Acepta certificados no confiables (¡solo para testing!)
    },
}

export async function executeRequest({ 
    query, 
    inputs = [], 
    outputs = [], 
    isStoredProcedure = false 
}) {
    const pool = await sql.connect(config); // Usa el pool existente
    
    try {
        let request = pool.request();

        // Agregar parámetros de entrada
        inputs.forEach(({ name, type, value }) => {
            request.input(name, type, value);
        });

        // Agregar parámetros de salida
        outputs.forEach(({ name, type }) => {
            request.output(name, type);
        });

        // Ejecutar consulta o procedimiento
        const result = isStoredProcedure 
            ? await request.execute(query) 
            : await request.query(query);

        return result;

    } finally {
        await pool.close(); // Cierra la conexión
    }
}