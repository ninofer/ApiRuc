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
        return result.recordset;
    } catch (err) {
        console.error('Error en getDataById:', err);
        throw err;
    }
}
