import { getDataBoolean, getDataString } from "../../sqlProcedures/sqlRequests.js";
import xmlgen from 'facturacionelectronicapy-xmlgen';
import xmlsign from 'facturacionelectronicapy-xmlsign';
import qrgen from 'facturacionelectronicapy-qrgen';

export const getParamsRemision = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const rucResult = await getDataString(
    `SELECT rtrim(dRucEm) + '-' + ltrim(dDVEmi) as ruc FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const nombreFantasiaResult = await getDataString(
    `SELECT dNomFanEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const actividadesEconomicasCodeResult = await getDataString(
    `SELECT cActEco from tmpFactuDE_D21 WHERE tipo = 7 and idMov = ${id}`
  );
  const actividadesEconomicasDescripcionResult = await getDataString(
    `SELECT dDEsACtEco from tmpFactuDE_D21 WHERE tipo = 7 and idMov = ${id}`
  );
  const timbradoNumeroResult = await getDataString(
    `SELECT dRucEm FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const timbradoFechaResult = await getDataString(
    `SELECT dFeIniT FROM tmpFactuDE_C WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoContribuyenteResult = await getDataString(
    `SELECT iTipCont FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoRegimenResult = await getDataString(
    `SELECT cTipReg FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const codigoResult = await getDataString(
    `SELECT dEst FROM tmpFactuDE_C WHERE tipo = 7 and idMov = ${id}`
  );
  const direccionResult = await getDataString(
    `SELECT dDirEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroCasaResult = await getDataString(
    `SELECT dNumCas FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const departamentoResult = await getDataString(
    `SELECT cDepEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  // Aquí se corrigió el await
  const departamentoDescripcionResult = await getDataString(
    `SELECT dDesDepEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const distritoResult = await getDataString(
    `SELECT cDisEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const distritoDescripcionResult = await getDataString(
    `SELECT dDesDisEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const ciudadResult = await getDataString(
    `SELECT cCiuEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const ciudadDescripcionResult = await getDataString(
    `SELECT dDesCiuEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const telefonoResult = await getDataString(
    `SELECT dTelEmi FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const emailResult = await getDataString(
    `SELECT dEmailE FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
  );
  const denominacionResult = await getDataString(
    `SELECT dDenSuc FROM tmpFactuDE_D2 WHERE tipo = 7 and idMov = ${id}`
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


export const getDataRemision = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const tipoDocumentoData = await getDataString(
    `SELECT iTiDE FROM tmpFactuDE_C WHERE tipo = 7 and idMov = ${id}`
  );
  const establecimientoData = await getDataString(
    `SELECT dEst from tmpFactuDE_C WHERE tipo = 7 and idMov = ${id}`
  );
  const codigoSeguridadAleatorioData = await getDataString(
    `SELECT dCodSeg from tmpFactuDE_B WHERE tipo = 7 and idMov = ${id}`
  );
  const puntoData = await getDataString(
    `SELECT dPunExp FROM tmpFactuDE_C WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroData = await getDataString(
    `SELECT dNumDoc FROM tmpFactuDE_C WHERE tipo = 7 and idMov = ${id}`
  );
  const fechaData = await getDataString(
    `SELECT dFeEmiDE FROM tmpFactuDE_D WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoEmisionData = await getDataString(
    `SELECT iTipEmi FROM tmpFactuDE_B WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoTransaccionData = await getDataString(
    `SELECT iTipTra FROM tmpFactuDE_D1 WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoImpuestoData = await getDataString(
    `SELECT iTImp FROM tmpFactuDE_D1 WHERE tipo = 7 and idMov = ${id}`
  );
  const monedaData = await getDataString(
    `SELECT cMoneOpe FROM tmpFactuDE_D1 WHERE tipo = 7 and idMov = ${id}`
  );
  const condicionAnticipoData = await getDataString(
    `SELECT iCondAnt FROM tmpFactuDE_D1 WHERE tipo = 7 and idMov = ${id}`
  );
  const condicionTipoCambioData = await getDataString(
    `SELECT dCondTiCam FROM tmpFactuDE_D1 WHERE tipo = 7 and idMov = ${id}`
  );
  const cambioData = await getDataString(
    `SELECT dTiCam FROM tmpFactuDE_D1 WHERE tipo = 7 and idMov = ${id}`
  );
  // datos del cliente, verificar con true o false
  const contribuyenteData = await getDataBoolean(
    `SELECT (case
              when iNatRec = 1 then 1
              else 0
            end) as resultadoFinal
     FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  )
  const rucData = await getDataString(
    `SELECT rtrim(dRucRec) + '-' + ltrim(dDVRec) as rucCliente FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  );
  const razonSocialData = await getDataString(
    `SELECT dNomRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  );
  const nombreFantasiaData = await getDataString(
    `SELECT dNomFanRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoOperacionData = await getDataString(
    `SELECT iTiOpe FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  );
  const direccionData = await getDataString(
    `SELECT dDirRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroCasaData = await getDataString(
    `SELECT dNumCasRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  );
  const departamentoData = await getDataString(
    `SELECT cDepRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const departamentoDescripcionData = await getDataString(
    `SELECT dDesDepRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const distritoData = await getDataString(
    `SELECT cDisRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const distritoDescripcionData = await getDataString(
    `SELECT dDesDisRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const ciudadData = await  getDataString(
    `SELECT cCiuRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const ciudadDescripcionData = await getDataString(
    `SELECT dDesCiuRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const paisData = await getDataString(
    `SELECT cPaisRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const paisDescripcionData = await getDataString(
    `SELECT dDesPaisRe FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const tipoContribuyenteData = await getDataString(
    `SELECT iTiContRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  )
  const documentoTipoData = await getDataString(
    `SELECT iTipIDRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const documentoNumeroData = await getDataString(
    `SELECT dNumIDRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const telefonoData = await getDataString(
    `SELECT dTelRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const celularData = await getDataString(
    `SELECT dCelRec FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const emailData = await getDataString(
    `SELECT rtrim(dEmailRec) FROM  tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  const codigoData = await getDataString(
    `SELECT dCodCliente FROM tmpFactuDE_D3 WHERE tipo = 7 and idMov = ${id}`
  ); 
  // DATOS REMISION
  const motivoData = await getDataString(
    `SELECT iMotEmiNR FROM tmpFactuDE_E6 WHERE tipo = 7 and idMov = ${id}`
  )
  const tipoResponsableData = await getDataString(
    `SELECT iRespEmiNR FROM tmpFactuDE_E6 WHERE tipo = 7 and idMov = ${id}`
  )
  const kilometrosData = await getDataString(
    `SELECT dKmR FROM tmpFactuDE_E6 WHERE tipo = 7 and idMov = ${id}`
  )
  const fechaFacturaData = await getDataString(
    `SELECT dFecEm FROM tmpFactuDE_E6 WHERE tipo = 7 and idMov = ${id}`
  )
  //detalles - items
  const codigoItemData = await getDataString(
    `SELECT dCodInt FROM tmpFactuDE_E8 WHERE tipo = 7 and idMov = ${id}`
  );
  const descripcionItemData = await getDataString(
    `SELECT dDesProSer FROM tmpFactuDE_E8 WHERE tipo = 7 and idMov = ${id}`
  );
  const unidadMedidaItemData = await getDataString(
    `SELECT cUniMed FROM tmpFactuDE_E8 WHERE tipo = 7 and idMov = ${id}`
  );
  const cantidadItemData = await getDataString(
    `SELECT dCantProSer FROM tmpFactuDE_E8 WHERE tipo = 7 and idMov = ${id}`
  );
  const precioUnitarioItemData = await getDataString(
    `SELECT dPUniProSer FROM tmpFactuDE_E81 WHERE tipo = 7 and idMov = ${id}`
  );
  const ivaTipoItemData = await getDataString(
    `SELECT iAfecIVA FROM tmpFactuDE_E82 WHERE tipo = 7 and idMov = ${id}`
  );
  const ivaBaseItemData = await getDataString(
    `SELECT dPropIVA FROM tmpFactuDE_E82 WHERE tipo = 7 and idMov = ${id}`
  );
  const ivaItemData = await getDataString(
    `SELECT dTasaIVA FROM tmpFactuDE_E82 WHERE tipo = 7 and idMov = ${id}`
  );
  // detalle transporte
  const tipoTransporteData = await getDataString(
    `SELECT iTipTrans FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  const modalidadTranporteData = await getDataString(
    `SELECT iModTrans FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  const tipoResponsableTranspeData = await getDataString(
    `SELECT iRespFlete FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  const inicioEstimadoTransladoData = await getDataString(
    `SELECT dIniTras FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  const finEstimadoTransladoData = await getDataString(
    `SELECT dFinTras FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  const paisDestinoData = await getDataString(
    `SELECT cPaisDest FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  const paisDestinoNombre  = await getDataString(
    `SELECT dDesPaisDest FROM tmpFactuDE_E10 WHERE tipo = 7 and idMov = ${id}`
  );
  // datos de la salida
  const direccionSalidaData = await getDataString(
    `SELECT dDirLocSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroCasaSalidaData = await getDataString(
    `SELECT dNumCasSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const complementoDireccion1SalidaData = await getDataString(
    `SELECT dComp1Sal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const complementoDireccion2SalidaData = await getDataString(
    `SELECT dComp2Sal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const departamentoSalidaData = await getDataString(
    `SELECT cDepSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const departamentoDescripcionSalidaData = await getDataString(
    `SELECT dDesDepSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const distritoSalidaData = await getDataString(
    `SELECT cDisSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const distritoDescripcionSalidaData = await getDataString(
    `SELECT dDesDisSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const ciudadSalidaData = await getDataString(
    `SELECT cCiuSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  const ciudadDescripcionSalidaData = await getDataString(
    `SELECT dDesCiuSal FROM tmpFactuDE_E101 WHERE tipo = 7 and idMov = ${id}`
  );
  // datos de la Entrega
  const direccionEntregaData = await getDataString(
    `SELECT dDirLocEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroCasaEntregaData = await getDataString(
    `SELECT dNumCasEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const complementoDireccion1EntregaData = await getDataString(
    `SELECT dComp1Ent FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const complementoDireccion2EntregaData = await getDataString(
    `SELECT dComp2Ent FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const departamentoEntregaData = await getDataString(
    `SELECT cDepEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const departamentoDescripcionEntregaData = await getDataString(
    `SELECT dDesDepEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const distritoEntregaData = await getDataString(
    `SELECT cDisEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const distritoDescripcionEntregaData = await getDataString(
    `SELECT dDesDisEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const ciudadEntregaData = await getDataString(
    `SELECT cCiuEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const ciudadDescripcionEntregaData = await getDataString(
    `SELECT dDesCiuEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );
  const telefonoContactoEntregaData = await getDataString(
    `SELECT dTelEnt FROM tmpFactuDE_E102 WHERE tipo = 7 and idMov = ${id}`
  );

  // datos del vehiculo
  const tipoVehiculoData = await getDataString(
    `SELECT dTiVehTras FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );
  const marcaVehiculoData = await getDataString(
    `SELECT dMarVeh FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );
  const documentoTipoVehiculoData = await getDataString(
    `SELECT dTipIdenVeh FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );
  const documentoNumeroVehiculoData = await getDataString(
    `SELECT dNroIDVeh FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );
  const observacionVehiculoData = await getDataString(
    `SELECT dAdicVeh FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroMatriculaVehiculoData = await getDataString(
    `SELECT dNroMatVeh FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );
  const numeroVueloVehiculoData = await getDataString(
    `SELECT dNroVuelo FROM tmpFactuDE_E103 WHERE tipo = 7 and idMov = ${id}`
  );

  // datos del transportista
  const contribuyenteTransportistaData = await getDataBoolean(
    `SELECT (case
              when iNatTrans = 1 then 1
              else 0
            end) as resultadoFinal
     FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );
  const nombreTransportistaData = await getDataString(
    `SELECT dNomTrans FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );
  const rucTransportistaData = await getDataString(
    `SELECT rtrim(dRucTrans) + '-' + ltrim(dDVTrans) as rucTransportista FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );
  const documentoTipoTransportistaData = await getDataString(
    `SELECT iTipIDTrans FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );
  const documentoNumeroTransportistaData = await getDataString(
    `SELECT dNumIDTrans  FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );

  // datos del chofer
  const documentoNumeroChofer = await getDataString(
    `SELECT dNumIDChof FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );
  const nombreChoferData = await getDataString(
    `SELECT dNomChof FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );
  const direccionChoferData = await getDataString(
    `SELECT dDirChof FROM tmpFactuDE_E104 WHERE tipo = 7 and idMov = ${id}`
  );

  // Construcción del objeto final (constructor de remisión)
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
    remision: {
      motivo: motivoData[0]?.iMotEmiNR || null,
      tipoResponsable: tipoResponsableData[0]?.iRespEmiNR || null,
      kms: kilometrosData[0]?.dKmR || null,
      fechaFactura: fechaFacturaData[0]?.dFecEm || null,
    },
    items: 
      codigoItemData.map((item, index) => {
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
    }),
    detalleTransporte: {
      tipo: tipoTransporteData[0]?.iTipTrans || null,
      modalidad: modalidadTranporteData[0]?.iModTrans || null,
      tipoResponsable: tipoResponsableTranspeData[0]?.iRespFlete || null,
      inicioEstimadoTranslado: inicioEstimadoTransladoData[0]?.dIniTras || null,
      finEstimadoTranslado: finEstimadoTransladoData[0]?.dFinTras || null,
      paisDestino: paisDestinoData[0]?.cPaisDest || null,
      paisDestinoNombre: paisDestinoNombre[0]?.dDesPaisDest || null,
      salida: {
        direccion: direccionSalidaData[0]?.dDirLocSal || null,
        numeroCasa: numeroCasaSalidaData[0]?.dNumCasSal ,
        complementoDireccion1: complementoDireccion1SalidaData[0]?.dComp1Sal || null,
        complementoDireccion2: complementoDireccion2SalidaData[0]?.dComp2Sal || null,
        departamento: departamentoSalidaData[0]?.cDepSal || null,
        departamentoDescripcion: departamentoDescripcionSalidaData[0]?.dDesDepSal || null,
        distrito: distritoSalidaData[0]?.cDisSal || null,
        distritoDescripcion: distritoDescripcionSalidaData[0]?.dDesDisSal || null,
        ciudad: ciudadSalidaData[0]?.cCiuSal || null,
        ciudadDescripcion: ciudadDescripcionSalidaData[0]?.dDesCiuSal || null,
      },
      entrega: {
        direccion: direccionEntregaData[0]?.dDirLocEnt || null,
        numeroCasa: numeroCasaEntregaData[0]?.dNumCasEnt,
        complementoDireccion1: complementoDireccion1EntregaData[0]?.dComp1Ent || null,
        complementoDireccion2: complementoDireccion2EntregaData[0]?.dComp2Ent || null,
        departamento: departamentoEntregaData[0]?.cDepEnt || null,
        departamentoDescripcion: departamentoDescripcionEntregaData[0]?.dDesDepEnt || null,
        distrito: distritoEntregaData[0]?.cDisEnt || null,
        distritoDescripcion: distritoDescripcionEntregaData[0]?.dDesDisEnt || null,
        ciudad: ciudadEntregaData[0]?.cCiuEnt || null,
        ciudadDescripcion: ciudadDescripcionEntregaData[0]?.dDesCiuEnt || null,
        telefonoContacto: telefonoContactoEntregaData[0]?.dTelEnt || null,
      },
      vehiculo: {
        tipo: tipoVehiculoData[0]?.dTiVehTras || null,
        marca: marcaVehiculoData[0]?.dMarVeh || null,
        documentoTipo: documentoTipoVehiculoData[0]?.dTipIdenVeh || null,
        documentoNumero: documentoNumeroVehiculoData[0]?.dNroIDVeh || null,
        obs: observacionVehiculoData[0]?.dAdicVeh || null,
        numeroMatricula: numeroMatriculaVehiculoData[0]?.dNroMatVeh || null,
        numeroVuelo: numeroVueloVehiculoData[0]?.dNroVuelo || null,
      },
      transportista: {
        contribuyente: contribuyenteTransportistaData || false,
        nombre: nombreTransportistaData[0]?.dNomTrans || null,
        ruc: rucTransportistaData[0]?.rucTransportista || null,
        documentoTipo: documentoTipoTransportistaData[0]?.iTipIDTrans || null,
        documentoNumero: documentoNumeroTransportistaData[0]?.dNumIDTrans || null,
        direccion: direccionSalidaData[0]?.dDirLocSal || null,
        chofer: {
          documentoNumero: documentoNumeroChofer[0]?.dNumIDChof || null,
          nombre: nombreChoferData[0]?.dNomChof || null,
          direccion: direccionChoferData[0]?.dDirChof || null,
        },
      },
    },
  };
}

const dataRemision = async () => {
    const id = 1006;
    const remision = await getDataRemision(id);
    console.log(remision);
}

const generadorDeXML = async (id) => {
  const parametros = await getParamsRemision(id);
  const data = await  getDataRemision(id);

  if (parametros && data) {
    const xml = await xmlgen.default.generateXMLDE(parametros, data);
    console.log(xml);
  }

}

//dataRemision();
generadorDeXML(1006)
