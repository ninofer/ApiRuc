// dbHandler.js
import sql from "mssql";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

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

const getConexion = async () => {
  try {

    const configData = readFile("C:/FacturaElectronica/configFactura.txt");
    if (!configData) {
      throw new Error("No se pudo leer el archivo de configuración.");
    }
    
    // Obtiene un objeto con los datos, por ejemplo:
    // { servidor: "192.168.1.190", nombreFirma: "c:\FacturaElectronica\PEDRO_...", ... }
    const config = parseConfig(configData);
    //console.log(config)
    // Extrae los campos que te interesan
    const servidor = config["servidor"];
    const nombreDB = config["nombreDB"];
    const usuario = config["usuario"];
    const claveBd = config["claveBd"];
    const puerto = config["puerto"]

    console.log(servidor, nombreDB, usuario, claveBd, puerto)

    //console.log(`Respuesta: ` + servidor);


    // Aquí puedes continuar con el procesamiento o devolver los valores
    return {  
      servidor,
      nombreDB,
      usuario,
      claveBd,
      puerto
    };
  } catch (err) {
    console.error("Error en getConexion:", err);
  }
};

const configuracion = await getConexion()


const config = {
  server: configuracion.servidor,
  database: configuracion.nombreDB,
  user: configuracion.usuario,
  password: configuracion.claveBd,
  port: parseInt(configuracion.puerto),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};


let poolPromise;

function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => {
        console.log("Conectado a la base de datos");
        return pool;
      })
      .catch((err) => {
        console.error("Error al conectar a la base de datos:", err);
        throw err;
      });
  }
  return poolPromise;
}

export async function executeRequest({
  query,
  inputs = [],
  outputs = [],
  isStoredProcedure = false,
}) {
  try {
    const pool = await getPool();
    const request = pool.request();

    // Agregar parámetros de entrada
    inputs.forEach(({ name, type, value }) => {
      request.input(name, type, value);
    });

    // Agregar parámetros de salida
    outputs.forEach(({ name, type }) => {
      request.output(name, type);
    });

    const result = isStoredProcedure
      ? await request.execute(query)
      : await request.query(query);

    return result;
  } catch (error) {
    console.error("Error en executeRequest:", error);
    throw error;
  }
}
