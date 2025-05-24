// IMPORT DE PAQUETES
import xmlgen from 'facturacionelectronicapy-xmlgen';
import xmlsign from 'facturacionelectronicapy-xmlsign';
import qrgen from 'facturacionelectronicapy-qrgen';
import xml2js from 'xml2js';
import setApi from 'facturacionelectronicapy-setapi'

// IMPORT DE FUNCIONES
import { getParamData, getParams } from "../utils/xmlGeneratorTest.js";
import { getParamsRemision, getDataRemision } from "../utils/xmlGeneratorRemision.js";
import { getDataCredito, getParamsCredito } from '../utils/xmlGeneratorNotaCredito.js';

// VARIABLE
import { configuracionGlobal } from "../../config/configRoute.js";
import { getDataString } from '../../sqlProcedures/sqlRequests.js';

const getQRFacturaControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;
    
    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    // 1. Obtener idMov desde tmpFactuDE_A usando idTransa
    const idMovResult = await getDataString(
      `SELECT idMov FROM tmpFactuDE_A WHERE idTransa = ${id}`
    );
    
    if (!idMovResult || idMovResult.length === 0) {
      return res.status(404).json({ mensaje: "No se encontró el idMov correspondiente" });
    };
    
    const idMov = idMovResult[0].idMov;

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParams(idMov);
    const data = await getParamData(idMov);

    // DESCOMENTAR IMPORTANTE !!!!!!!!!!!!!!!!!1
    console.log("Tipo de procedimineto: ", data.tipoDocumento);
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    
    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default.signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
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

const getQRRemisionControler = async (req, res) => {
  try {
    const { id } = req.params;
    // Aqui se desestructura data del body del request
    //const { data } = req.body;
    
    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    //Para usar cuando el cliente envie el json (te lee el body)
    //const data = await getXML(id);

    const parametros = await getParamsRemision(id);
    const data = await getDataRemision(id);

    console.log("Tipo de procedimineto: ", data.tipoDocumento);
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default.signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
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
    console.error("Error en getQRRemisionController:", err);
    res.status(500).json({
      error: "Error al en getQRRemisionControler: ",
      mensaje: err.message,
    });
  }
}

const getQRNotaCreditoControler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ mensaje: "Faltan parámetros: id" });
    }

    const parametros = await getParamsCredito(id);
    const data = await getDataCredito(id);

    console.log("Tipo de procedimineto: ", data.tipoDocumento);
    console.log("Id de la transaccion: ", id);
    console.log("Fecha de la transaccion: ", new Date().toLocaleString());

    if (parametros && data) {
      // Crea el XML
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      //Aqui se firma el XML
      const xmlFirmado = await xmlsign.default.signXML(xml, configuracionGlobal.firma, configuracionGlobal.claveFirma)
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
    console.error("Error en getQRRemisionController:", err);
    res.status(500).json({
      error: "Error al en getQRRemisionControler: ",
      mensaje: err.message,
    });
  }
}

export default {
  getQRFacturaControler,
  getQRRemisionControler,
  getQRNotaCreditoControler
};