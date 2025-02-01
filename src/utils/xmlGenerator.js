import xmlgen from "facturacionelectronicapy-xmlgen";
import { getDataById, getDataString } from "../../sqlProcedures/sqlRequests.js";

const id = 4812541;

export const params = {
  version: 150,
  ruc: getDataString(`SELECT dRucEm FROM tmpFactuDE_D2 WHERE idMov = ${id}`),
  razonSocial:
    "DE generado en ambiente de prueba - sin valor comercial ni fiscal",
  //razonSocial:  getDataString(`SELECT dNomEmmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`),,
  nombreFantasia: getDataString(
    `SELECT dNomFanEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  ),
  timbradoNumero: getDataString(
    `SELECT dRucEm FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  ),
  //timbradoNumero: getDataString(`SELECT dNumTim FROM tmpFactuDE_C WHERE idMov = ${id}`),//emitter.TimbradoNumero,
  timbradoFecha: getDataString(
    `SELECT dFeIniT FROM tmpFactuDE_C WHERE idMov = ${id}`
  ),
  tipoContribuyente: getDataString(
    `SELECT iTipCont FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  ),
  tipoRegimen: getDataString(
    `SELECT cTipReg FROM tmpFactuDE_D2 WHERE idMov = ${id}`
  ),
  establecimientos: [
    {
      codigo: getDataString(
        `SELECT dEst FROM tmpFactuDE_C WHERE idMov = ${id}`
      ),
      direccion: getDataString(
        `SELECT dDirEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      numeroCasa: getDataString(
        `SELECT dNumCas FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      departamento: getDataString(
        `SELECT cDepEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      departamentoDescripcion: getDataString(
        `SELECT dDesDepEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      distrito: getDataString(
        `SELECT cDisEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      distritoDescripcion: getDataString(
        `SELECT dDesDisEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      ciudad: getDataString(
        `SELECT cCiuEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      ciudadDescripcion: getDataString(
        `SELECT dDesCiuEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      telefono: getDataString(
        `SELECT dTelEmi FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      email: getDataString(
        `SELECT dEmailE FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
      denominacion: getDataString(
        `SELECT dDenSuc FROM tmpFactuDE_D2 WHERE idMov = ${id}`
      ),
    },
  ],
};

const data = {
  tipoDocumento: tipoDocumento,
  establecimiento: a,
  punto: a,
  numero: a,
  fecha: a,
  cliente: {
    contribuyente: a,
    ruc: a,
    razonSocial: a,
  },
  items: documentData.map((item) => ({
    codigo: item.ItemCodigo,
    descripcion: item.ItemDescripcion,
    cantidad: item.Cantidad,
    precioUnitario: item.PrecioUnitario,
    unidadMedida: 77, // 77=Unidad
  })),
};

/*const xmlGenerator = (params, data, options)=> {
    const xml = xmlgen.default.generateXMLDE(params, data)
                      .then(xml => console.log(xml))
                      .catch(error => {
                        console.log(error);
                      });
}

const xmlTest = xmlGenerator(testParams, testData) */
