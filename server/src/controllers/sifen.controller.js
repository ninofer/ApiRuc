import { consultarRuc } from "../utils/sifenClient.js";

const consultaRuc = async (req, res) => {
    try {
        const { id, ruc } = req.query;
        
        // Validacion de parametros
        if (!id || !ruc) {
            return res.status(400).json({ mensaje: "Faltan parametros obligatorios"})
        }

        // LLamo la cliente
        const result = await consultarRuc(id, ruc);

        // Devuelve la respuesta en formato JSON
        res.json({
          codigoRespuesta: result.dCodRes,
          mensajeRespuesta: result.dMsgRes,
          datos: result.xContRUC
            ? {
                ruc: result.xContRuc.dRUCCons,
                razonSocial: result.xContRUC.dRazCons,
                estado: result.xContRuc.dDesEstCons,
              }
            : null,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al consultar el RUC",
            mensaje: error.message
        });
    }
}

export default {
    consultaRuc
}