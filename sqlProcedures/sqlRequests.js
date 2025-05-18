import { executeRequest } from "../src/utils/dbHandler.js";
import sql from "mssql";


// Ejemplo 1: Consulta SQL simple
export async function getDataById(id) {
  try {
    const result = await executeRequest({
      query: "SELECT * FROM tmpFactuDE_A WHERE idTransa = @id",
      inputs: [{ name: "id", type: sql.Int, value: id }],
    });
    console.log(result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Error en getDataById:", err);
    throw err;
  }
}

export async function getDataString(query) {
  try {
    const result = await executeRequest({
      query: query,
    });
    return result.recordset;
  } catch (err) {
    console.error("Error en getDataString:", err);
    throw err;
  }
}

export async function getDataFegetDataFechacha(query) {
  try {
    const result = await executeRequest({ query: query });
    console.log(result.recordset[0].fechaFactura);
    
    // Convertir el objeto Date a string ISO (ej: "2025-01-10T00:00:00.000Z")
    const fechaEntera = result.recordset[0].fechaFactura.toISOString();
    
    // Ahora sí puedes usar split
    const soloFecha = fechaEntera.split('T')[0];
    console.log(soloFecha);
    
    return fechaEntera;
  } catch (err) {
    console.error("Error en getDataString:", err);
    throw err;
  }
}

export async function getDataBoolean(query) {
  try {
    const result = await executeRequest({
      query: query,
    });
    // Verifica que el recordset tenga al menos un registro
    if (result.recordset.length > 0 && result.recordset[0].resultadoFinal === 1) {
      return true;
    }
    // Si no hay registros o el valor no es 1, retorna false (o el valor que consideres adecuado)
    return false;
  } catch (err) {
    console.error("Error en getDataBoolean:", err);
    throw err;
  }
}
