// dbHandler.js
import sql from "mssql";
import dotenv from "dotenv";
import fs from "fs";
import { getInformacion } from "./readConfig.js";
import { configuracionGlobal } from "../../config/configRoute.js";

dotenv.config();

const config = {
  server: configuracionGlobal.servidor,
  database: configuracionGlobal.nombreDB,
  user: configuracionGlobal.usuario,
  password: configuracionGlobal.claveBd,
  port: parseInt(configuracionGlobal.puerto),
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
