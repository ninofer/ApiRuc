import { getDataById, getDataString } from "../../sqlProcedures/sqlRequests.js";

export const getParams = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const rucResult = await getDataString(
    `SELECT dRucEm FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const nombreFantasiaResult = await getDataString(
    `SELECT dNomFanEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const actividadesEconomicasCodeResult = await getDataString(
    `SELECT cActEco from tmpFactuDE_D21 WHERE idMov = ${id}`
  );
  const actividadesEconomicasDescripcionResult = await getDataString(
    `SELECT dDEsACtEco from tmpFactuDE_D21 WHERE idMov = ${id}`
  );
  const timbradoNumeroResult = await getDataString(
    `SELECT dRucEm FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const timbradoFechaResult = await getDataString(
    `SELECT dFeIniT FROM tmpFactuDE_C WHERE idMov = ${id}`
  );
  const tipoContribuyenteResult = await getDataString(
    `SELECT iTipCont FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const tipoRegimenResult = await getDataString(
    `SELECT cTipReg FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const codigoResult = await getDataString(
    `SELECT dEst FROM tmpFactuDE_C WHERE idMov = ${id}`
  );
  const direccionResult = await getDataString(
    `SELECT dDirEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const numeroCasaResult = await getDataString(
    `SELECT dNumCas FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const departamentoResult = await getDataString(
    `SELECT cDepEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  // Aquí se corrigió el await
  const departamentoDescripcionResult = await getDataString(
    `SELECT dDesDepEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const distritoResult = await getDataString(
    `SELECT cDisEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const distritoDescripcionResult = await getDataString(
    `SELECT dDesDisEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const ciudadResult = await getDataString(
    `SELECT cCiuEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const ciudadDescripcionResult = await getDataString(
    `SELECT dDesCiuEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const telefonoResult = await getDataString(
    `SELECT dTelEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const emailResult = await getDataString(
    `SELECT dEmailE FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  );
  const denominacionResult = await getDataString(
    `SELECT dDenSuc FROM tmpFactuDE_D2 WHERE idMov = ${id}`
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
    ruc: rucResult[0]?.dRucEm || null,
    razonSocial:
      "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
    nombreFantasia: nombreFantasiaResult[0]?.dNomFanEmi || null,
    actividadesEconomicas,
    timbradoNumero: timbradoNumeroResult[0]?.dRucEm || null,
    timbradoFecha: timbradoFechaResult[0]?.dFeIniT || null,
    tipoContribuyente: tipoContribuyenteResult[0]?.iTipCont || null,
    tipoRegimen: tipoRegimenResult[0]?.cTipReg || null,
    establecimineto: [
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

export const getParamData = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const tipoDocumentoData = await getDataString(
    `SELECT iTiDE FROM tmpFactuDE_C WHERE idMov = ${id}`
  );
  const establecimientoData = await getDataString(
    `SELECT dEst from tmpFactuDE_C WHERE idMov = ${id}`
  );
  const codigoSeguridadAleatorioData = await getDataString(
    `SELECT dCodSeg from tmpFactuDE_B WHERE idMov = ${id}`
  );
  const puntoData = await getDataString(
    `SELECT dPunExp FROM tmpFactuDE_C WHERE idMov = ${id}`
  );
  const numeroData = await getDataString(
    `SELECT dNumDoc FROM tmpFactuDE_C WHERE idMov = ${id}`
  );
  const fechaData = await getDataString(
    `SELECT fechaFactura FROM tmpFactuDE_A WHERE idMov = ${id}`
  );
  const tipoEmisionData = await getDataString(
    `SELECT iTipEmi FROM tmpFactuDE_B WHERE idMov = ${id}`
  );
  const tipoTransaccionData = await getDataString(
    `SELECT iTipTra FROM tmpFactuDE_D1 WHERE idMov = ${id}`
  );
  const tipoImpuestoData = await getDataString(
    `SELECT iTImp FROM tmpFactuDE_D1 WHERE idMov = ${id}`
  );
  const monedaData = await getDataString(
    `SELECT cMoneOpe FROM tmpFactuDE_D1 WHERE idMov = ${id}`
  );
  const condicionAnticipoData = await getDataString(
    `SELECT iCondAnt FROM tmpFactuDE_D1 WHERE idMov = ${id}`
  );
  const condicionTipoCambioData = await getDataString(
    `SELECT dCondTiCam FROM tmpFactuDE_D1 WHERE idMov = ${id}`
  );
  const cambioData = await getDataString(
    `SELECT dTiCam FROM tmpFactuDE_D1 WHERE idMov = ${id}`
  );
  // datos del cliente, verificar con true o false
  const contribuyenteData = await getDataString(
    `SELECT iNatRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const rucData = await getDataString(
    `SELECT dRucRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const razonSocialData = await getDataString(
    `SELECT dNomRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const nombreFantasiaData = await getDataString(
    `SELECT dNomFanRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const tipoOperacionData = await getDataString(
    `SELECT iTiOpe FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const direccionData = await getDataString(
    `SELECT dDirRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const numeroCasaData = await getDataString(
    `SELECT dNumCasRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const departamentoData = await getDataString(
    `SELECT cDepRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const departamentoDescripcionData = await getDataString(
    `SELECT dDesDepRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const distritoData = await getDataString(
    `SELECT cDisRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const distritoDescripcionData = await getDataString(
    `SELECT dDesDisRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const ciudadData = await getDataString(
    `SELECT cCiuRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const ciudadDescripcionData = await getDataString(
    `SELECT dDesCiuRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const paisData = await getDataString(
    `SELECT cPaisRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const paisDescripcionData = await getDataString(
    `SELECT dDesPaisRe FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const tipoContribuyenteData = await getDataString(
    `SELECT iTiContRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const documentoTipoData = await getDataString(
    `SELECT iTipIDRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const documentoNumeroData = await getDataString(
    `SELECT dNumIDRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const telefonoData = await getDataString(
    `SELECT dTelRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const celularData = await getDataString(
    `SELECT dCelRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const emailData = await getDataString(
    `SELECT dEmailRec FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  const codigoData = await getDataString(
    `SELECT dCodCliente FROM tmpFactuDE_D3 WHERE idMov = ${id}`
  );
  // tipo de operacion
  const presenciaData = await getDataString(
    `SELECT iIndPres FROM tmpFactuDE_E WHERE idMov = ${id}`
  );
  const fechaEnvioData = await getDataString(
    `SELECT dFecEmNR FROM tmpFactuDE_E WHERE idMov = ${id}`
  );
  // condicion y tipo de pago (contado o credito)
  const tipoData = await getDataString(
    `SELECT iTiPago FROM tmpFactuDE_E71 WHERE idMov = ${id}`
  );
  //al contado
  const montoData = await getDataString(
    `SELECT dMonTiPag FROM tmpFactuDE_E71 WHERE idMov = ${id}`
  );
  const nombreMonedaData = await getDataString(
    `SELECT cMoneTiPag FROM tmpFactuDE_E71 WHERE idMov = ${id}`
  );
  const cambioMonedaData = await getDataString(
    `SELECT dTiCamTiPag FROM tmpFactuDE_E71 WHERE idMov = ${id}`
  );
  //por tarjeta
  const nombreTarjetaData = await getDataString(
    `SELECT dDesDenTarj FROM tmpFactuDE_E711 WHERE idMov = ${id}`
  );
  const titularTarjetaData = await getDataString(
    `SELECT dNomTit FROM tmpFactuDE_E711 WHERE idMov = ${id}`
  );
  const rucTarjetaData = await getDataString(
    `SELECT dRUCProTar FROM tmpFactuDE_E711 WHERE idMov = ${id}`
  );
  const razonSocialTarjetaData = await getDataString(
    `SELECT dRSProTar FROM tmpFactuDE_E711 WHERE idMov = ${id}`
  );
  const medioPagoTarjetaData = await getDataString(
    `SELECT iForProPa FROM tmpFactuDE_E711 WHERE idMov = ${id}`
  );
  const codigoAutorizacionTarjetaData = await getDataString(
    `SELECT dCodAuOpe FROM tmpFactuDE_E711 WHERE idMov = ${id}`
  );
  //cheque
  const nroChequeData = await getDataString(
    `SELECT dNumCheq FROM tmpFactuDE_E712 WHERE idMov = ${id}`
  );
  const bancoChequeData = await getDataString(
    `SELECT dBcoEmi FROM tmpFactuDE_E712 WHERE idMov = ${id}`
  );
  //credito
  const tipoCreditoData = await getDataString(
    `SELECT iCondCred FROM tmpFactuDE_E72 WHERE idMov = ${id}`
  );
  const plazoCreditoData = await getDataString(
    `SELECT dPlazoCre FROM tmpFactuDE_E72 WHERE idMov = ${id}`
  );
  //detalles - items
  const codigoItemData = await getDataString(
    `SELECT dCodInt FROM tmpFactuDE_E8 WHERE idMov = ${id}`
  );
  const descripcionItemData = await getDataString(
    `SELECT dDesProSer FROM tmpFactuDE_E8 WHERE idMov = ${id}`
  );
  const unidadMedidaItemData = await getDataString(
    `SELECT cUniMed FROM tmpFactuDE_E8 WHERE idMov = ${id}`
  );
  const cantidadItemData = await getDataString(
    `SELECT dCantProSer FROM tmpFactuDE_E8 WHERE idMov = ${id}`
  );
  const precioUnitarioItemData = await getDataString(
    `SELECT dPUniProSer FROM tmpFactuDE_E81 WHERE idMov = ${id}`
  );
  const ivaTipoItemData = await getDataString(
    `SELECT iAfecIVA FROM tmpFactuDE_E82 WHERE idMov = ${id}`
  );
  const ivaBaseItemData = await getDataString(
    `SELECT dPropIVA FROM tmpFactuDE_E82 WHERE idMov = ${id}`
  );
  const ivaItemData = await getDataString(
    `SELECT dTasaIVA FROM tmpFactuDE_E82 WHERE idMov = ${id}`
  );

  // el detalle
  const detalleItems = codigoItemData.map((item, index) => {
    return {
      codigo: item.dCodInt.trim(),
      descripcion: descripcionItemData[index]?.dDesProSer.trim() || null,
      unidadMedida: unidadMedidaItemData[index]?.cUniMed || null,
      cantidad: cantidadItemData[index]?.dCantProSer || null,
      precioUnitario: precioUnitarioItemData[index]?.dPUniProSer || null,
      ivaTipo: ivaTipoItemData[index]?.iAfecIVA || null,
      ivaBase: ivaBaseItemData[index]?.dPropIVA || null,
      iva: ivaItemData[index]?.dTasaIVA || null,
    };
  });

  return {
    tipoDocumento: tipoDocumentoData[0]?.iTiDE || null,
    establecimiento: establecimientoData[0]?.dEst || null,
    codigoSeguridadAleatorio: codigoSeguridadAleatorioData[0]?.dCodSeg || null,
    punto: puntoData[0]?.dPunExp || null,
    numero: numeroData[0]?.dNumDoc || null,
    fecha: fechaData[0]?.fechaFactura || null,
    tipoEmision: tipoEmisionData[0]?.iTipEmi || null,
    tipoTransaccion: tipoTransaccionData[0]?.iTipTra || null,
    tipoImpuesto: tipoImpuestoData[0]?.iTImp || null,
    moneda: monedaData[0]?.cMoneOpe || null,
    condicionAnticipo: condicionAnticipoData[0]?.iCondAnt || null,
    condicionTipoCambio: condicionTipoCambioData[0]?.dCondTiCam || null,
    cambio: cambioData[0]?.dTiCam || null,
    cliente: {
      contribuyente: contribuyenteData[0]?.iNatRec || null,
      ruc: rucData[0]?.dRucRec || null,
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
      documentoTipo: documentoTipoData[0]?.iTipIDRec || null,
      documentoNumero: documentoNumeroData[0]?.dNumIDRec || null,
      telefono: telefonoData[0]?.dTelRec || null,
      celular: celularData[0]?.dCelRec || null,
      email: emailData[0]?.dEmailRec || null,
      codigo: codigoData[0]?.dCodCliente || null,
      factura: {
        presencia: presenciaData[0]?.iIndPres || null,
        fechaEnvio: fechaEnvioData[0]?.dFecEmNR || null,
      },
      condicion: {
        tipo: tipoData[0]?.iTiPago || null,
        monto: montoData[0]?.dMonTiPag || null,
        moneda: nombreMonedaData[0]?.dDMoneTiPag || null,
        cambio: cambioMonedaData[0]?.dTiCamTiPag || null,
        infoTarjeta: {
          tipoDescripcion: nombreTarjetaData[0]?.dDesDenTarj || null,
          titular: titularTarjetaData[0]?.dNomTit || null,
          ruc: rucTarjetaData[0]?.dRUCProTar || null,
          razonSocial: razonSocialTarjetaData[0]?.dRSProTar || null,
          medioPago: medioPagoTarjetaData[0]?.iForProPa || null,
          codigoAutorizacion:
            codigoAutorizacionTarjetaData[0]?.dCodAuOpe || null,
        },
        infoCheque: {
          numeroCheque: nroChequeData[0]?.dNumCheq || null,
          banco: bancoChequeData[0]?.dBcoEmi || null,
        },
      },
      credito: {
        tipo: tipoCreditoData[0]?.iCondCred || null,
        plazo: plazoCreditoData[0]?.dPlazoCre || null,
      },
      items: [
        {
          detalleItems,
        },
      ],
    },
  };
};
