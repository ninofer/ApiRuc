import { getDataBoolean, getDataString } from "../../sqlProcedures/sqlRequests.js";
import xmlgen from 'facturacionelectronicapy-xmlgen';

export const getParamsCredito = async (id) => {
    // Ejecuta cada consulta y guarda el resultado
    const rucResult = await getDataString(
      `SELECT rtrim(dRucEm) + '-' + ltrim(dDVEmi) as ruc FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const nombreFantasiaResult = await getDataString(
      `SELECT dNomFanEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const actividadesEconomicasCodeResult = await getDataString(
      `SELECT cActEco from tmpFactuDE_D21 WHERE tipo = 5 and idMov = ${id}`
    );
    const actividadesEconomicasDescripcionResult = await getDataString(
      `SELECT dDEsACtEco from tmpFactuDE_D21 WHERE tipo = 5 and idMov = ${id}`
    );
    const timbradoNumeroResult = await getDataString(
      `SELECT dRucEm FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const timbradoFechaResult = await getDataString(
      `SELECT dFeIniT FROM tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
    );
    const tipoContribuyenteResult = await getDataString(
      `SELECT iTipCont FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const tipoRegimenResult = await getDataString(
      `SELECT cTipReg FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const codigoResult = await getDataString(
      `SELECT dEst FROM tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
    );
    const direccionResult = await getDataString(
      `SELECT dDirEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const numeroCasaResult = await getDataString(
      `SELECT dNumCas FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const departamentoResult = await getDataString(
      `SELECT cDepEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    // Aquí se corrigió el await
    const departamentoDescripcionResult = await getDataString(
      `SELECT dDesDepEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const distritoResult = await getDataString(
      `SELECT cDisEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const distritoDescripcionResult = await getDataString(
      `SELECT dDesDisEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const ciudadResult = await getDataString(
      `SELECT cCiuEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const ciudadDescripcionResult = await getDataString(
      `SELECT dDesCiuEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const telefonoResult = await getDataString(
      `SELECT dTelEmi FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const emailResult = await getDataString(
      `SELECT dEmailE FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
    );
    const denominacionResult = await getDataString(
      `SELECT dDenSuc FROM tmpFactuDE_D2 WHERE tipo = 5 and idMov = ${id}`
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
      razonSocial:
        "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
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


export const getDataCredito = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const tipoDocumentoData = await getDataString(
    `SELECT iTiDE FROM tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
  );
  const numeroTimbradoData = await getDataString(
    `SELECT dNumTim FROM tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
  );
  const establecimientoData = await getDataString(
    `SELECT dEst from tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
  );
  const codigoSeguridadAleatorioData = await getDataString(
    `SELECT dCodSeg from tmpFactuDE_B WHERE tipo = 5 and idMov = ${id}`
  );
  const puntoData = await getDataString(
    `SELECT dPunExp FROM tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
  );
  const numeroData = await getDataString(
    `SELECT dNumDoc FROM tmpFactuDE_C WHERE tipo = 5 and idMov = ${id}`
  );
  const fechaData = await getDataString(
    `SELECT dFeEmiDE FROM tmpFactuDE_D WHERE tipo = 5 and idMov = ${id}`
  );
  const tipoEmisionData = await getDataString(
    `SELECT iTipEmi FROM tmpFactuDE_B WHERE tipo = 5 and idMov = ${id}`
  );
  const tipoTransaccionData = await getDataString(
    `SELECT iTipTra FROM tmpFactuDE_D1 WHERE tipo = 5 and idMov = ${id}`
  );
  const tipoImpuestoData = await getDataString(
    `SELECT iTImp FROM tmpFactuDE_D1 WHERE tipo = 5 and idMov = ${id}`
  );
  const monedaData = await getDataString(
    `SELECT cMoneOpe FROM tmpFactuDE_D1 WHERE tipo = 5 and idMov = ${id}`
  );
  const condicionAnticipoData = await getDataString(
    `SELECT iCondAnt FROM tmpFactuDE_D1 WHERE tipo = 5 and idMov = ${id}`
  );
  const condicionTipoCambioData = await getDataString(
    `SELECT dCondTiCam FROM tmpFactuDE_D1 WHERE tipo = 5 and idMov = ${id}`
  );
  const cambioData = await getDataString(
    `SELECT dTiCam FROM tmpFactuDE_D1 WHERE tipo = 5 and idMov = ${id}`
  );
  // datos del cliente, verificar con true o false
  const contribuyenteData = await getDataBoolean(
    `SELECT (case
              when iNatRec = 1 then 1
              else 0
            end) as resultadoFinal
     FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  )
  const rucData = await getDataString(
    `SELECT rtrim(dRucRec) + '-' + ltrim(dDVRec) as rucCliente FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  );
  const razonSocialData = await getDataString(
    `SELECT dNomRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  );
  const nombreFantasiaData = await getDataString(
    `SELECT dNomFanRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  );
  const tipoOperacionData = await getDataString(
    `SELECT iTiOpe FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  );
  const direccionData = await getDataString(
    `SELECT dDirRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  );
  const numeroCasaData = await getDataString(
    `SELECT dNumCasRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  );
  const departamentoData = await getDataString(
    `SELECT cDepRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const departamentoDescripcionData = await getDataString(
    `SELECT dDesDepRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const distritoData = await getDataString(
    `SELECT cDisRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const distritoDescripcionData = await getDataString(
    `SELECT dDesDisRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const ciudadData = await  getDataString(
    `SELECT cCiuRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const ciudadDescripcionData = await getDataString(
    `SELECT dDesCiuRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const paisData = await getDataString(
    `SELECT cPaisRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const paisDescripcionData = await getDataString(
    `SELECT dDesPaisRe FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const tipoContribuyenteData = await getDataString(
    `SELECT iTiContRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  )
  const documentoTipoData = await getDataString(
    `SELECT iTipIDRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const documentoNumeroData = await getDataString(
    `SELECT dNumIDRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const telefonoData = await getDataString(
    `SELECT dTelRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const celularData = await getDataString(
    `SELECT dCelRec FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const emailData = await getDataString(
    `SELECT rtrim(dEmailRec) FROM  tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 
  const codigoData = await getDataString(
    `SELECT dCodCliente FROM tmpFactuDE_D3 WHERE tipo = 5 and idMov = ${id}`
  ); 

  // datos de la nota de credito
  const motivoNotaCredito = await getDataString(
    `SELECT iMotEmi FROM tmpFactuDE_E5 WHERE tipo = 5 and idMov = ${id}`
  )

  //detalles - items
  const codigoItemData = await getDataString(
    `SELECT dCodInt FROM tmpFactuDE_E8 WHERE tipo = 5 and idMov = ${id}`
  );
  const descripcionItemData = await getDataString(
    `SELECT dDesProSer FROM tmpFactuDE_E8 WHERE tipo = 5 and idMov = ${id}`
  );
  const unidadMedidaItemData = await getDataString(
    `SELECT cUniMed FROM tmpFactuDE_E8 WHERE tipo = 5 and idMov = ${id}`
  );
  const cantidadItemData = await getDataString(
    `SELECT dCantProSer FROM tmpFactuDE_E8 WHERE tipo = 5 and idMov = ${id}`
  );
  const precioUnitarioItemData = await getDataString(
    `SELECT dPUniProSer FROM tmpFactuDE_E81 WHERE tipo = 5 and idMov = ${id}`
  );
  const ivaTipoItemData = await getDataString(
    `SELECT iAfecIVA FROM tmpFactuDE_E82 WHERE tipo = 5 and idMov = ${id}`
  );
  const ivaBaseItemData = await getDataString(
    `SELECT dPropIVA FROM tmpFactuDE_E82 WHERE tipo = 5 and idMov = ${id}`
  );
  const ivaItemData = await getDataString(
    `SELECT dTasaIVA FROM tmpFactuDE_E82 WHERE tipo = 5 and idMov = ${id}`
  );

  // detalle documentoAsociado
  const formatoData = await getDataString(
    `SELECT iTipDocAso FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const cdcAsociadoData = await getDataString(
    `SELECT dCdCDERef FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const tipoAsociadoData = await getDataString(
    `SELECT iTipoDocAso FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const timbradoAsociadoData = await getDataString(
    `SELECT dNTimDI FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const establecimientoAsociadoData = await getDataString(
    `SELECT dNTimDI FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const puntoAsociadoData = await getDataString(
    `SELECT dEstDocAso FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const numeroAsociadoData = await getDataString(
    `SELECT dNumDocAso FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const fechaAsociadoData = await getDataString(
    `SELECT dFecEmiDI FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const numeroRetencionAsociadoData = await getDataString(
    `SELECT dNumComRet FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const resolucionCreditoFiscalData = await getDataString(
    `SELECT dNumResCF FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const constanciaTipoData = await getDataString(
    `SELECT iTipCons FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const constanciaNumeroData = await getDataString(
    `SELECT dNumCons FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );
  const constanciaControlData = await getDataString(
    `SELECT dNumControl FROM tmpFactuDE_H WHERE tipo = 5 and idMov = ${id}`
  );

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
    notaCreditoDebito: {
        motivo: motivoNotaCredito[0]?.iMotEmi || null
    },
    items: 
        codigoItemData.map((item, index) => {
            return {
                codigo: item.dCodInt.trim(),
                descripcion: descripcionItemData[index]?.dDesProSer.trim() || null,
                unidadMedida: unidadMedidaItemData[index]?.cUniMed || null,
                cantidad: cantidadItemData[index]?.dCantProSer || null,
                precioUnitario: precioUnitarioItemData[index]?.dPUniProSer || null,
                ivaTipo: ivaTipoItemData[index]?.iAfecIVA,
                ivaBase: ivaBaseItemData[index]?.dPropIVA,
                iva: ivaItemData[index]?.dTasaIVA,
            };
        }
    ),
    documentoAsociado: {
        formato: formatoData[0]?.iTipDocAso || null,
        cdc: cdcAsociadoData[0]?.dCdCDERef || null,
        tipo: tipoAsociadoData[0]?.iTipoDocAso || null,
        timbrado: timbradoAsociadoData[0]?.dNTimDI || null,
        establecimiento: establecimientoAsociadoData[0]?.dEstDocAso || null,
        punto: puntoAsociadoData[0]?.dPExpDocAso || null,
        numero: numeroAsociadoData[0]?.dNumDocAso || null,
        fecha: fechaAsociadoData[0]?.dFecEmiDI || null,
        numeroRetencion: numeroRetencionAsociadoData[0]?.dNumComRet || null,
        resolucionCreditoFiscal: resolucionCreditoFiscalData[0]?.dNumResCF || null,
        constanciaTipo: constanciaTipoData[0]?.iTipCons || null,
        constanciaNumero: constanciaNumeroData[0]?.dNumCons || null,
        constanciaControl: constanciaControlData[0]?.dNumControl || null
    }
  }
}

const dataCredito = async () => {
    const id = 33;
    const notaDeCredito = await getDataCredito(id);
    console.log(notaDeCredito);
}

const generadorDeXML = async (id) => {
    const parametros = await getParamsCredito(id);
    const data = await  getDataCredito(id);
  
    if (parametros && data) {
      const xml = await xmlgen.default.generateXMLDE(parametros, data);
      console.log(xml);
    }
  
  }
  
  //dataRemision();
  generadorDeXML(33)


