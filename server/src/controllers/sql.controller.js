import { getDataById, getDataString } from "../../sqlProcedures/sqlRequests.js";

const getDataId = async (req, res) => {
    try {
        const { id } = req.params;
    
        if (!id ) {
          return res.status(400).json({ mensaje: "Faltan parámetros: id" });
        }
        
        const data = await getDataById(id);

        res.status(200).json({
            mensaje: "Consulta exitosa",
            respuesta: data,
          });

    } catch (err) {
        console.error('Error en getDataById:', err);
        res.status(500).json({
        error: "Error al consultar data",
        mensaje: err.message,
        })
    }
}

const getDataInt = async (req, res) => {
    try {
        const { id } = req.params;
    
        if (!id ) {
          return res.status(400).json({ mensaje: "Faltan parámetros: id" });
        }
        
        const data = await getDataString(`SELECT Id FROM tmpFactuDE_A WHERE idTransa = ${id}`);

        res.status(200).json({
            mensaje: "Consulta exitosa",
            respuesta: data,
          });
        
    } catch (err) {
        console.error('Error en getDataById:', err);
        res.status(500).json({
        error: "Error al consultar data",
        mensaje: err.message,
        })
    }
}


export default {
    getDataId,
    getDataInt
}