import fs from "fs";

/**
 * Función para leer el contenido de un archivo de forma síncrona.
 * Se especifica la codificación 'utf8' para obtener directamente el string.
 */
const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error(`Error al leer el archivo: ${error.message}`);
  }
}

/**
 * Función que utiliza una expresión regular para extraer las etiquetas y sus valores.
 * Se valida que la etiqueta de apertura y cierre coincidan.
 */
const parseConfig = (data) => {
  const regex = /<([^>]+)>(.*?)<\/\1>/gs;
  const config = {};
  let match;

  while ((match = regex.exec(data)) !== null) {
    const tag = match[1];
    const value = match[2].trim();
    config[tag] = value;
  }
  return config;
}

/**
 * Función asíncrona que lee el archivo de configuración, lo parsea y extrae
 * los valores de las etiquetas que te interesan (por ejemplo, "nombreFirma" y "claveFirma").
 */
const getValorVariable = async (req, res) => {
  try {
        // Ruta absoluta del certificado
      const configPath = path.join(
          __dirname,
          "FacturacionElectronica",
          "configFactura.txt"
        );
    const configData = readFile(configPath);
    if (!configData) {
      throw new Error("No se pudo leer el archivo de configuración.");
    }

    const nombreClave = req.body.nombreClave;

    
    // Obtiene un objeto con los datos, por ejemplo:
    // { servidor: "192.168.1.190", nombreFirma: "c:\FacturaElectronica\PEDRO_...", ... }
    const config = parseConfig(configData);
    //console.log(config)
    // Extrae los campos que te interesan
    const nombreClaveFinal = config[nombreClave.nombreClave];

    console.log(`Respuesta: ` + nombreClaveFinal);


    // Aquí puedes continuar con el procesamiento o devolver los valores
    return { nombreClave };
  } catch (err) {
    console.error("Error en getValorVariable:", err);
    // Si estás en un entorno Express, podrías responder así:
    // res.status(500).json({
    //   error: "Error al consultar data",
    //   mensaje: err.message,
    // });
  }
};

export default { getValorVariable };