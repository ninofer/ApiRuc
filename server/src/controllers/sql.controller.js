import { getDataById, getDataString } from "../../sqlProcedures/sqlRequests.js";
import { getParamData, getParams } from "../utils/xmlGeneratorTest.js";
import xmlgen from 'facturacionelectronicapy-xmlgen';
import xmlsign from 'facturacionelectronicapy-xmlsign';
import qrgen from 'facturacionelectronicapy-qrgen';
import xml2js from 'xml2js';


const getDataId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    const data = await getDataById(id);

    res.status(200).json({
      mensaje: "Consulta exitosa",
      respuesta: data,
    });
  } catch (err) {
    console.error("Error en getDataById:", err);
    res.status(500).json({
      error: "Error al consultar data",
      mensaje: err.message,
    });
  }
};

const getDataS = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    const data = await getDataString(
      `SELECT Id FROM tmpFactuDE_A WHERE idTransa = ${id}`
    );

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error en getDataString:", err);
    res.status(500).json({
      error: "Error al consultar detDataString",
      mensaje: err.message,
    });
  }
};

const parametrosJson = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    const data = await getParams(id);

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error en getDataString:", err);
    res.status(500).json({
      error: "Error al consultar detDataString",
      mensaje: err.message,
    });
  }
};

const parametrosDataJson = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    const data = await getParamData(id);

    res.status(200).json({ data });
  } catch (err) {
    console.error("Error en getDataString:", err);
    res.status(500).json({
      error: "Error al consultar detDataString",
      mensaje: err.message,
    });
  }
};

const getXMLControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;
    
    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParams(id);
    const data = await getParamData(id);

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default.signXML(xml, './src/certs/RAMON_MYSKO_BUBEN_VIT_S_A.p12', 'PBRI111533')
      .catch(err => console.error("Error al firmar XML:", err));

      //Aqui se genera el QR
      const QrFinal = await qrgen.default.generateQR(xmlFirmado);
      
      const parser = new xml2js.Parser({
          explicitArray: false,
          tagNameProcessors: [xml2js.processors.stripPrefix],
      });
      
      parser.parseString(QrFinal, (err, result) => {
        if (err) {
          console.error("Error al parsear el XML:", err);
          return;
        }
        // La estructura resultante se ajusta a los nombres de nodos sin prefijo
        // Accedemos al nodo gCamFuFD y luego a dCarQR
        const qrString = result.rDE.gCamFuFD.dCarQR;

        res.status(200).send(qrString);
        // Aquí ya puedes trabajar con la cadena del QR (qrString)
      });  
    }

  } catch (err) {
    console.error("Error en getDataString:", err);
    res.status(500).json({
      error: "Error al en getXMLControler: ",
      mensaje: err.message,
    });
  }
}

export default {
  getDataId,
  getDataS,
  parametrosJson,
  parametrosDataJson,
  getXMLControler
};
