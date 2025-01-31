import { executeRequest } from '../src/utils/dbHandler.js';
import sql from 'mssql'; 

// Ejemplo 1: Consulta SQL simple
export async function getDataById(id) {
    try {
        const result = await executeRequest({
            query: 'SELECT * FROM tmpFactuDE_A WHERE idTransa = @id',
            inputs: [
                { name: 'id', type: sql.Int, value: id }
            ]
        });
        console.log(result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error en getDataById:', err);
        throw err;
    }
}

export async function getDataString(query) {
    try {
        const result = await executeRequest({
            query: query
        })
        console.log(result.recordset)
        return result.recordset
    } catch (error) {
        console.error('Error en getDataInterger:', err);
        throw err;
    }
}