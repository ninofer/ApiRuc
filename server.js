import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import sifenRoute from "./src/routes/sifen.route.js";
import sqlRoute from "./src/routes/sql.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Para que mi api pueda utilizar json en mis bodys
app.use(bodyParser.json());

//console.log("Hola");
// Endpoint para consultar el Ruc
app.use("/api/sifen", sifenRoute);

// Endpoint para sql
app.use("/api/sql", sqlRoute);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
