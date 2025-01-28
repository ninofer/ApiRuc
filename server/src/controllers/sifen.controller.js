import setApi from 'facturacionelectronicapy-setapi';

const askRuc = async (req, res) => {
    try {
        const { id, ruc } = req.query;

        // Validación de parámetros
        if (!id || !ruc) {
            return res.status(400).json({ mensaje: "Faltan parámetros obligatorios: id y ruc" });
        }

        // Variables necesarias para la consulta
        const certPath = "./src/certs/RAMON_MYSKO_BUBEN_VIT_S_A.p12"; // Ruta del certificado
        const certPassword = process.env.CERT_PASSWORD; // Contraseña del certificado
        const environment = process.env.ENV || "test"; // Entorno (test o prod)

        // Realiza la consulta de RUC
        const result = await setApi.default.consultaRUC(
            parseInt(id), // ID de la operación
            ruc, // RUC a consultar
            environment, // Entorno (test o prod)
            certPath, // Ruta al certificado .p12
            certPassword // Contraseña del certificado
        );

        // Devuelve la respuesta en formato JSON
        res.json({
            mensaje: "Consulta exitosa",
            datos: result, // Devuelve el resultado obtenido de la SET
        });

    } catch (error) {
        console.error("Error al consultar el RUC:", error);
        res.status(500).json({
            error: "Error al consultar el RUC",
            mensaje: error.message,
        });
    }
};

export default {
    askRuc,
};
