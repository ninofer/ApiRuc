import { getDataById, getDataString, getDataBoolean } from "../../sqlProcedures/sqlRequests.js";
import xmlgen from 'facturacionelectronicapy-xmlgen';
import xmlsign from 'facturacionelectronicapy-xmlsign';
import qrgen from 'facturacionelectronicapy-qrgen';
import xml2js, { parseString } from 'xml2js';
import setApi from 'facturacionelectronicapy-setapi'

import { configuracionGlobal } from "../../config/configRoute.js";

console.log(configuracionGlobal)

export const getParams = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const rucResult = await getDataString(
    `SELECT rtrim(dRucEm) + '-' + ltrim(dDVEmi) as ruc FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const nombreFantasiaResult = await getDataString(
    `SELECT dNomFanEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const actividadesEconomicasCodeResult = await getDataString(
    `SELECT cActEco from tmpFactuDE_D21 WHERE tipo = 1 and idMov = ${id}`
  );
  const actividadesEconomicasDescripcionResult = await getDataString(
    `SELECT dDEsACtEco from tmpFactuDE_D21 WHERE tipo = 1 and idMov = ${id}`
  );
  const timbradoNumeroResult = await getDataString(
    `SELECT dRucEm FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const timbradoFechaResult = await getDataString(
    `SELECT dFeIniT FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoContribuyenteResult = await getDataString(
    `SELECT iTipCont FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoRegimenResult = await getDataString(
    `SELECT cTipReg FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const codigoResult = await getDataString(
    `SELECT dEst FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${id}`
  );
  const direccionResult = await getDataString(
    `SELECT dDirEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const numeroCasaResult = await getDataString(
    `SELECT dNumCas FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const departamentoResult = await getDataString(
    `SELECT cDepEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  // Aquí se corrigió el await
  const departamentoDescripcionResult = await getDataString(
    `SELECT dDesDepEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const distritoResult = await getDataString(
    `SELECT cDisEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const distritoDescripcionResult = await getDataString(
    `SELECT dDesDisEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const ciudadResult = await getDataString(
    `SELECT cCiuEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const ciudadDescripcionResult = await getDataString(
    `SELECT dDesCiuEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const telefonoResult = await getDataString(
    `SELECT dTelEmi FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const emailResult = await getDataString(
    `SELECT dEmailE FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );
  const denominacionResult = await getDataString(
    `SELECT dDenSuc FROM tmpFactuDE_D2 WHERE tipo = 1 and idMov = ${id}`
  );

  const actividadesEconomicas = actividadesEconomicasCodeResult.map(
    (item, index) => {
      return {
        codigo: item.cActEco.trim(),
        descripcion:
          actividadesEconomicasDescripcionResult[index]?.dDEsACtEco.trim() ||
          null,
      };
    }
  );

  return {
    version: 150,
    ruc: rucResult[0]?.ruc || null,
    razonSocial: "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
    nombreFantasia: nombreFantasiaResult[0]?.dNomFanEmi || null,
    actividadesEconomicas,
    timbradoNumero: timbradoNumeroResult[0]?.dRucEm || null,
    timbradoFecha: timbradoFechaResult[0]?.dFeIniT || null,
    tipoContribuyente: tipoContribuyenteResult[0]?.iTipCont || null,
    tipoRegimen: tipoRegimenResult[0]?.cTipReg || null,
    establecimientos: [
      {
        codigo: codigoResult[0]?.dEst || null,
        direccion: direccionResult[0]?.dDirEmi || null,
        numeroCasa: numeroCasaResult[0]?.dNumCas,
        departamento: departamentoResult[0]?.cDepEmi || null,
        departamentoDescripcion:
          departamentoDescripcionResult[0]?.dDesDepEmi || null,
        distrito: distritoResult[0]?.cDisEmi || null,
        distritoDescripcion: distritoDescripcionResult[0]?.dDesDisEmi || null,
        ciudad: ciudadResult[0]?.cCiuEmi || null,
        ciudadDescripcion: ciudadDescripcionResult[0]?.dDesCiuEmi || null,
        telefono: telefonoResult[0]?.dTelEmi || null,
        email: emailResult[0]?.dEmailE || null,
        denominacion: denominacionResult[0]?.dDenSuc || null,
      },
    ],
  };
};

export const getParamData = async (variable) => {
  const tipoDocumentoData = await getDataString(
    `SELECT iTiDE FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${variable}`
  );
  const establecimientoData = await getDataString(
    `SELECT dEst from tmpFactuDE_C WHERE tipo = 1 and idMov = ${variable}`
  );
  const codigoSeguridadAleatorioData = await getDataString(
    `SELECT dCodSeg from tmpFactuDE_B WHERE tipo = 1 and idMov = ${variable}`
  );
  const puntoData = await getDataString(
    `SELECT dPunExp FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${variable}`
  );
  const numeroData = await getDataString(
    `SELECT dNumDoc FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${variable}`
  );
  const fechaData = await getDataString(
    `SELECT dFeEmiDE FROM tmpFactuDE_D WHERE tipo = 1 and idMov = ${variable}`
  );
  const tipoEmisionData = await getDataString(
    `SELECT iTipEmi FROM tmpFactuDE_B WHERE tipo = 1 and idMov = ${variable}`
  );
  const tipoTransaccionData = await getDataString(
    `SELECT iTipTra FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${variable}`
  );
  const tipoImpuestoData = await getDataString(
    `SELECT iTImp FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${variable}`
  );
  const monedaData = await getDataString(
    `SELECT cMoneOpe FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${variable}`
  );
  const condicionAnticipoData = await getDataString(
    `SELECT iCondAnt FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${variable}`
  );
  const condicionTipoCambioData = await getDataString(
    `SELECT dCondTiCam FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${variable}`
  );
  const cambioData = await getDataString(
    `SELECT dTiCam FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${variable}`
  );
  // datos del cliente, verificar con true o false
  const contribuyenteData = await getDataBoolean(
    `SELECT (case
              when iNatRec = 1 then 1
              else 0
            end) as resultadoFinal
     FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  )
  const rucData = await getDataString(
    `SELECT rtrim(dRucRec) + '-' + ltrim(dDVRec) as rucCliente FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const razonSocialData = await getDataString(
    `SELECT dNomRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const nombreFantasiaData = await getDataString(
    `SELECT dNomFanRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const tipoOperacionData = await getDataString(
    `SELECT iTiOpe FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const direccionData = await getDataString(
    `SELECT dDirRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const numeroCasaData = await getDataString(
    `SELECT dNumCasRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const departamentoData = await getDataString(
    `SELECT cDepRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const departamentoDescripcionData = await getDataString(
    `SELECT dDesDepRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const distritoData = await getDataString(
    `SELECT cDisRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const distritoDescripcionData = await getDataString(
    `SELECT dDesDisRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const ciudadData = await  getDataString(
    `SELECT cCiuRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const ciudadDescripcionData = await getDataString(
    `SELECT dDesCiuRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const paisData = await getDataString(
    `SELECT cPaisRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const paisDescripcionData = await getDataString(
    `SELECT dDesPaisRe FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const tipoContribuyenteData = await getDataString(
    `SELECT iTiContRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  )
  const documentoTipoData = await getDataString(
    `SELECT iTipIDRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const documentoNumeroData = await getDataString(
    `SELECT dNumIDRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  );
  const telefonoData = await getDataString(
    `SELECT dTelRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const celularData = await getDataString(
    `SELECT dCelRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const emailData = await getDataString(
    `SELECT rtrim(dEmailRec) FROM  tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const codigoData = await getDataString(
    `SELECT dCodCliente FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${variable}`
  ); 
  // tipo de operacion 
  const presenciaData = await getDataString(
    `SELECT iIndPres FROM tmpFactuDE_E WHERE tipo = 1 and idMov = ${variable}`
  ); 
  const fechaEnvioData = await getDataString(
    `SELECT dFecEmNR FROM tmpFactuDE_E WHERE tipo = 1 and idMov = ${variable}`
  ); 
  // condicion y tipo de pago (contado o credito)
  const tipoData = await getDataString(
    `SELECT iTiPago FROM tmpFactuDE_E71 WHERE tipo = 1 and idMov = ${variable}`
  );
  //al contado
  const montoData = await getDataString(
    `SELECT dMonTiPag FROM tmpFactuDE_E71 WHERE tipo = 1 and idMov = ${variable}`
  );
  const nombreMonedaData = await getDataString(
    `SELECT cMoneTiPag FROM tmpFactuDE_E71 WHERE tipo = 1 and idMov = ${variable}`
  );
  const cambioMonedaData = await getDataString(
    `SELECT dTiCamTiPag FROM tmpFactuDE_E71 WHERE tipo = 1 and idMov = ${variable}`
  );
  //por tarjeta
  const nombreTarjetaData = await getDataString(
    `SELECT dDesDenTarj FROM tmpFactuDE_E711 WHERE tipo = 1 and idMov = ${variable}`
  );
  const titularTarjetaData = await getDataString(
    `SELECT dNomTit FROM tmpFactuDE_E711 WHERE tipo = 1 and idMov = ${variable}`
  );
  const rucTarjetaData = await getDataString(
    `SELECT dRUCProTar FROM tmpFactuDE_E711 WHERE tipo = 1 and idMov = ${variable}`
  );
  const razonSocialTarjetaData = await getDataString(
    `SELECT dRSProTar FROM tmpFactuDE_E711 WHERE tipo = 1 and idMov = ${variable}`
  );
  const medioPagoTarjetaData = await getDataString(
    `SELECT iForProPa FROM tmpFactuDE_E711 WHERE tipo = 1 and idMov = ${variable}`
  );
  const codigoAutorizacionTarjetaData = await getDataString(
    `SELECT dCodAuOpe FROM tmpFactuDE_E711 WHERE tipo = 1 and idMov = ${variable}`
  );
  //cheque
  const nroChequeData = await getDataString(
    `SELECT dNumCheq FROM tmpFactuDE_E712 WHERE tipo = 1 and idMov = ${variable}`
  );
  const bancoChequeData = await getDataString(
    `SELECT dBcoEmi FROM tmpFactuDE_E712 WHERE tipo = 1 and idMov = ${variable}`
  );
  //credito
  const tipoCondicionData = await getDataString(
    `SELECT iCondOpe FROM tmpFactuDE_E7 WHERE tipo = 1 and idMov = ${variable}`
  )
  // para hacer el switch
  const tipoPagoCreditoData = await getDataString(
    `SELECT iTiPago FROM tmpFactuDE_E71 WHERE tipo = 1 and idMov = ${variable}`
  )
  const tipoCreditoData = await getDataString(
    `SELECT iCondCred FROM tmpFactuDE_E72 WHERE tipo = 1 and idMov = ${variable}`
  );
  const plazoCreditoData = await getDataString(
    `SELECT dPlazoCre FROM tmpFactuDE_E72 WHERE tipo = 1 and idMov = ${variable}`
  );
  //detalles - items
  const codigoItemData = await getDataString(
    `SELECT dCodInt FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${variable}`
  )
  const descripcionItemData = await getDataString(
    `SELECT dDesProSer FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${variable}`
  );
  const unidadMedidaItemData = await getDataString(
    `SELECT cUniMed FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${variable}`
  );
  const cantidadItemData = await getDataString(
    `SELECT dCantProSer FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${variable}`
  );
  const precioUnitarioItemData = await getDataString(
    `SELECT dPUniProSer FROM tmpFactuDE_E81 WHERE tipo = 1 and idMov = ${variable}`
  );
  const ivaTipoItemData = await getDataString(
    `SELECT iAfecIVA FROM tmpFactuDE_E82 WHERE tipo = 1 and idMov = ${variable}`
  );
  const ivaBaseItemData = await getDataString(
    `SELECT dPropIVA FROM tmpFactuDE_E82 WHERE tipo = 1 and idMov = ${variable}`
  );
  const ivaItemData = await getDataString(
    `SELECT dTasaIVA FROM tmpFactuDE_E82 WHERE tipo = 1 and idMov = ${variable}`
  );

  // INFO EXTRA ULTIMA ACUTALIZACION SIFEN
  const obligacionesData = await getDataString(
    `SELECT cOblAfe, dDesOblAfe FROM tmpFactuDE_D11 WHERE tipo = 1 and idMov = ${variable}`
  );

  const respuesta = await contribuyenteData.resultadoFinal;
  //console.log(respuesta)
  return {
    tipoDocumento: tipoDocumentoData[0]?.iTiDE || null,
    establecimiento: establecimientoData[0]?.dEst || null,
    codigoSeguridadAleatorio: codigoSeguridadAleatorioData[0]?.dCodSeg || null,
    punto: puntoData[0]?.dPunExp || null,
    numero: numeroData[0]?.dNumDoc || null,
    fecha: fechaData[0]?.dFeEmiDE || null,
    tipoEmision: tipoEmisionData[0]?.iTipEmi || null,
    tipoTransaccion: tipoTransaccionData[0]?.iTipTra || null,
    tipoImpuesto: tipoImpuestoData[0]?.iTImp || null,
    moneda: monedaData[0]?.cMoneOpe || null,
    condicionAnticipo: condicionAnticipoData[0]?.iCondAnt || null,
    condicionTipoCambio: condicionTipoCambioData[0]?.dCondTiCam || null,
    cambio: cambioData[0]?.dTiCam || null,
    cliente: {
      contribuyente: contribuyenteData || false,
      ruc: rucData[0]?.rucCliente || null,
      razonSocial: razonSocialData[0]?.dNomRec || null,
      nombreFantasia: nombreFantasiaData[0]?.dNomFanRec || null,
      tipoOperacion: tipoOperacionData[0]?.iTiOpe || null,
      direccion: direccionData[0]?.dDirRec || null,
      numeroCasa: numeroCasaData[0]?.dNumCasRec,
      departamento: departamentoData[0]?.cDepRec || null,
      departamentoDescripcion:
        departamentoDescripcionData[0]?.dDesDepRec || null,
      distrito: distritoData[0]?.cDisRec || null,
      distritoDescripcion: distritoDescripcionData[0]?.dDesDisRec || null,
      ciudad: ciudadData[0]?.cCiuRec || null,
      ciudadDescripcion: ciudadDescripcionData[0]?.dDesCiuRec || null,
      pais: paisData[0]?.cPaisRec || null,
      paisDescripcion: paisDescripcionData[0]?.dDesPaisRe || null,
      tipoContribuyente: tipoContribuyenteData[0]?.iTiContRec || null,
      documentoTipo: documentoTipoData[0]?.iTipIDRec,
      documentoNumero: documentoNumeroData[0]?.dNumIDRec || null,
      telefono: telefonoData[0]?.dTelRec || null,
      celular: celularData[0]?.dCelRec || null,
      email: emailData[0]?.dEmailRec || null,
      codigo: codigoData[0]?.dCodCliente || null,
    },
    factura: {
      presencia: presenciaData[0]?.iIndPres || null,
      fechaEnvio: fechaEnvioData[0]?.dFecEmNR || null,
    },
    condicion: {
      tipo: tipoCondicionData[0]?.iCondOpe || null,
      ...(tipoCondicionData[0]?.iCondOpe === 1 ? {
          entregas: [{
              tipo: tipoCondicionData[0]?.iCondOpe || null,
              monto: montoData[0]?.dMonTiPag || null,
              moneda: nombreMonedaData[0]?.cMoneTiPag || null,
              cambio: cambioMonedaData[0]?.dTiCamTiPag || null,
              infoTarjeta: {
                  tipoDescripcion: nombreTarjetaData[0]?.dDesDenTarj || null,
                  titular: titularTarjetaData[0]?.dNomTit || null,
                  ruc: rucTarjetaData[0]?.dRUCProTar || null,
                  razonSocial: razonSocialTarjetaData[0]?.dRSProTar || null,
                  medioPago: medioPagoTarjetaData[0]?.iForProPa || null,
                  codigoAutorizacion: codigoAutorizacionTarjetaData[0]?.dCodAuOpe || null
              },
              infoCheque: {
                  numeroCheque: nroChequeData[0]?.dNumCheq || null,
                  banco: bancoChequeData[0]?.dBcoEmi || null,
              }
          }]
      } : {}),
      ...(tipoCondicionData[0]?.iCondOpe === 2 ? {
          credito: {
              tipo: tipoCreditoData[0]?.iCondCred || null,
              plazo: plazoCreditoData[0]?.dPlazoCre || null,
          }
      } : {})
    },    
      items: 
        codigoItemData.map((item, index) => {
          return {
            codigo: item.dCodInt.trim(),
            descripcion: descripcionItemData[index]?.dDesProSer.trim() || null,
            unidadMedida: unidadMedidaItemData[index]?.cUniMed || null,
            cantidad: cantidadItemData[index]?.dCantProSer || null,
            precioUnitario: precioUnitarioItemData[index]?.dPUniProSer || null,
            ivaTipo: ivaTipoItemData[index]?.iAfecIVA ,
            ivaBase: ivaBaseItemData[index]?.dPropIVA ,
            iva: ivaItemData[index]?.dTasaIVA ,
          };
      },
    ),
    extraInfo: {
      obligaciones: obligacionesData.map(item => ({
        cOblAfe: item.cOblAfe,
        dDesOblAfe: item.dDesOblAfe
      }))
    }
}}

const generadorDeXML = async (id) => {
  const parametros = await getParams(id);
  const data = await getParamData(id);

  if (parametros && data) {
    // Generar XML inicial
    const xml = await xmlgen.default.generateXMLDE(parametros, data);

    const xmlFirmado = await xmlsign.default.signXML(
      xml, 
      '/home/sebastian/FacturaElectronica/PEDRO_SEMENIUK_FEDORICHEN_VIT_S_A.p12', 
      'seagro454'
    ).catch(err => console.error("Error al firmar XML:", err));
    // Generar QR
    // En tu función generadorDeXML, después de generar el QR:
    const QrFinal = await qrgen.default.generateQR(xmlFirmado, configuracionGlobal.idCSC, configuracionGlobal.CSC, configuracionGlobal.env).catch(err => console.log("Error al genera.r el QR: ", err));
    // Parsear XML para modificar
    const parser = new xml2js.Parser({
      explicitArray: false,
      ignoreAttrs: false,
    });
    
    /* const injectXml = {
      soap
    } */

    // Convertir a objeto JS
    let xmlObj = await parser.parseStringPromise(QrFinal);
    
    return console.log(xmlObj)
    
    const gOpeCom = xmlObj.rDE.DE.gDatGralOpe.gOpeCom;

    // Mapear las obligaciones
    if(data.extraInfo.obligaciones && data.extraInfo.obligaciones.length > 0) {  // Aqui pregunto si hay resultado en las obligaciones
      gOpeCom.gOblAfe = data.extraInfo.obligaciones.map(obligacion => ({
        cOblAfe: obligacion.cOblAfe,
        dDesOblAfe: obligacion.dDesOblAfe
      }));
    }

    // Modifica el builder para incluir los namespaces necesarios
    const builder = new xml2js.Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: '  ' },
      explicitRoot: false,
      xmlns: { 
        '': 'http://ekuatia.set.gov.py/sifen/xsd',
        'xsi': 'http://www.w3.org/2001/XMLSchema-instance'
      },
      attrkey: '$'
    });

    // Agrega schemaLocation
    xmlObj.rDE.$ = {
      'xsi:schemaLocation': 'http://ekuatia.set.gov.py/sifen/xsd siRecepDE_v150.xsd'
    };
    // Convertir nuevamente a XML
    const xmlModificado = builder.buildObject(xmlObj);
    //console.log(xmlModificado);

  }
}

const firmadorDeXML = async (id) => {
  const parametros = await getParams(id);
  const data = await getParamData(id);

  if (parametros && data) {
    // Esperamos que generateXMLDE resuelva y retorne el XML como cadena
    const xml = await xmlgen.default.generateXMLDE(parametros, data);
    // Ahora llamamos a signXML pasando el XML ya resuelto
    const xmlFirmado = await xmlsign.default.signXML(xml, '/home/sebastian/FacturaElectronica/PEDRO_SEMENIUK_FEDORICHEN_VIT_S_A.p12', 'seagro454')
      .catch(err => console.error("Error al firmar XML:", err));

    const QrFinal = await qrgen.default.generateQR(xmlFirmado)//.then(xml => console.log("XML con QR", xml));
    console.log(QrFinal)
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
       //console.log("QR extraído:", qrString);
      // Aquí ya puedes trabajar con la cadena del QR (qrString)
    });    

  } 

};

const enviarSifen = async (id) => {
  const idRandom = Math.floor(Math.random() * 10000);
  const xmlFirmado = await generadorDeXML(id) //.then(data => console.log(data))  // PARA MIRAR MI XML FORMADO
  const env = 'test';

  setApi.default
    .recibe(idRandom, xmlFirmado, env, '/home/sebastian/FacturaElectronica/PEDRO_SEMENIUK_FEDORICHEN_VIT_S_A.p12', 'seagro454')
    .then(xml => {
      console.log("Respuesta SIFEN completa:", JSON.stringify(xml, null, 2)); // Para ver la estructura completa

      // Acceder a gResProc
      const gResProc = xml['ns2:rRetEnviDe']['ns2:rProtDe']['ns2:gResProc'];
      console.log("gResProc:", gResProc);

      // Si necesitas acceder a propiedades dentro de gResProc
      if (gResProc) {
        // Por ejemplo si es un objeto:
        console.log("Detalle de gResProc:", gResProc['ns2:dCodRes']);
        // O si es un array:
        console.log("Primer elemento:", gResProc[0]);
      }
    });
};


//enviarSifen(772);