export const getDataRemision = async (id) => {
  // Ejecuta cada consulta y guarda el resultado
  const tipoDocumentoData = await getDataString(
    `SELECT iTiDE FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${id}`
  );
  const establecimientoData = await getDataString(
    `SELECT dEst from tmpFactuDE_C WHERE tipo = 1 and idMov = ${id}`
  );
  const codigoSeguridadAleatorioData = await getDataString(
    `SELECT dCodSeg from tmpFactuDE_B WHERE tipo = 1 and idMov = ${id}`
  );
  const puntoData = await getDataString(
    `SELECT dPunExp FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${id}`
  );
  const numeroData = await getDataString(
    `SELECT dNumDoc FROM tmpFactuDE_C WHERE tipo = 1 and idMov = ${id}`
  );
  const fechaData = await getDataString(
    `SELECT dFeEmiDE FROM tmpFactuDE_D WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoEmisionData = await getDataString(
    `SELECT iTipEmi FROM tmpFactuDE_B WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoTransaccionData = await getDataString(
    `SELECT iTipTra FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoImpuestoData = await getDataString(
    `SELECT iTImp FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${id}`
  );
  const monedaData = await getDataString(
    `SELECT cMoneOpe FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${id}`
  );
  const condicionAnticipoData = await getDataString(
    `SELECT iCondAnt FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${id}`
  );
  const condicionTipoCambioData = await getDataString(
    `SELECT dCondTiCam FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${id}`
  );
  const cambioData = await getDataString(
    `SELECT dTiCam FROM tmpFactuDE_D1 WHERE tipo = 1 and idMov = ${id}`
  );
  // datos del cliente, verificar con true o false
  const contribuyenteData = await getDataBoolean(
    `SELECT (case
              when iNatRec = 1 then 1
              else 0
            end) as resultadoFinal
     FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  )
  const rucData = await getDataString(
    `SELECT rtrim(dRucRec) + '-' + ltrim(dDVRec) as rucCliente FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  );
  const razonSocialData = await getDataString(
    `SELECT dNomRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  );
  const nombreFantasiaData = await getDataString(
    `SELECT dNomFanRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoOperacionData = await getDataString(
    `SELECT iTiOpe FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  );
  const direccionData = await getDataString(
    `SELECT dDirRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  );
  const numeroCasaData = await getDataString(
    `SELECT dNumCasRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  );
  const departamentoData = await getDataString(
    `SELECT cDepRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const departamentoDescripcionData = await getDataString(
    `SELECT dDesDepRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const distritoData = await getDataString(
    `SELECT cDisRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const distritoDescripcionData = await getDataString(
    `SELECT dDesDisRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const ciudadData = await  getDataString(
    `SELECT cCiuRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const ciudadDescripcionData = await getDataString(
    `SELECT dDesCiuRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const paisData = await getDataString(
    `SELECT cPaisRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const paisDescripcionData = await getDataString(
    `SELECT dDesPaisRe FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const tipoContribuyenteData = await getDataString(
    `SELECT iTiContRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  )
  const documentoTipoData = await getDataString(
    `SELECT iTipIDRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const documentoNumeroData = await getDataString(
    `SELECT dNumIDRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const telefonoData = await getDataString(
    `SELECT dTelRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const celularData = await getDataString(
    `SELECT dCelRec FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const emailData = await getDataString(
    `SELECT rtrim(dEmailRec) FROM  tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  const codigoData = await getDataString(
    `SELECT dCodCliente FROM tmpFactuDE_D3 WHERE tipo = 1 and idMov = ${id}`
  ); 
  // DATOS REMISION
  const motivoData = await getDataString(
    `SELECT iMotEmiNR FROM tmpFactuDE_E6 WHERE tipo = 1 and idMov = ${id}`
  )
  const tipoResponsableData = await getDataString(
    `SELECT iRespEmiNR FROM tmpFactuDE_E6 WHERE tipo = 1 and idMov = ${id}`
  )
  const kilometrosData = await getDataString(
    `SELECT dKmR FROM tmpFactuDE_E6 WHERE tipo = 1 and idMov = ${id}`
  )
  const fechaFacturaData = await getDataString(
    `SELECT dFecEm FROM tmpFactuDE_E6 WHERE tipo = 1 and idMov = ${id}`
  )
  //detalles - items
  const codigoItemData = await getDataString(
    `SELECT dCodInt FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${id}`
  );
  const descripcionItemData = await getDataString(
    `SELECT dDesProSer FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${id}`
  );
  const unidadMedidaItemData = await getDataString(
    `SELECT cUniMed FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${id}`
  );
  const cantidadItemData = await getDataString(
    `SELECT dCantProSer FROM tmpFactuDE_E8 WHERE tipo = 1 and idMov = ${id}`
  );
  const precioUnitarioItemData = await getDataString(
    `SELECT dPUniProSer FROM tmpFactuDE_E81 WHERE tipo = 1 and idMov = ${id}`
  );
  const ivaTipoItemData = await getDataString(
    `SELECT iAfecIVA FROM tmpFactuDE_E82 WHERE tipo = 1 and idMov = ${id}`
  );
  const ivaBaseItemData = await getDataString(
    `SELECT dPropIVA FROM tmpFactuDE_E82 WHERE tipo = 1 and idMov = ${id}`
  );
  const ivaItemData = await getDataString(
    `SELECT dTasaIVA FROM tmpFactuDE_E82 WHERE tipo = 1 and idMov = ${id}`
  );
  // detalle transportista
  const tipoTransportistaData = await getDataString(
    `SELECT iTipTrans FROM tmpFactuDE_E10 WHERE tipo = 1 and idMov = ${id}`
  );
  const modalidadTranportistaData = await getDataString(
    `SELECT iModTrans FROM tmpFactuDE_E10 WHERE tipo = 1 and idMov = ${id}`
  );
  const tipoResponsableTransportistaData = await getDataString(
    `SELECT iRespFlete FROM tmpFactuDE_E10 WHERE tipo = 1 and idMov - ${id}`
  );
}