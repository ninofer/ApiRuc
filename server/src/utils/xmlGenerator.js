import xmlgen from "facturacionelectronicapy-xmlgen"
import { getDataString } from "../../sqlProcedures/sqlRequests.js";

const id = 47864

export const params = {
    version: 150,
    ruc: getDataString(`SELECT Id FROM tmpFactuDE_A WHERE idTransa = ${id}`),
    razonSocial: a,//emitter.RazonSocial,
    nombreFantasia: a,//emitter.NombreFantasia,
    timbradoNumero: a,//emitter.TimbradoNumero,
    timbradoFecha: a,// emitter.TimbradoFecha.toISOString().split('T')[0],
    tipoContribuyente: a,//emitter.TipoContribuyente,
    tipoRegimen: a, //emitter.TipoRegimen,
    establecimientos: [{
      codigo: "001",
      direccion: a,//emitter.Direccion,
      numeroCasa: a,//emitter.NumeroCasa,
      departamento: a,//emitter.DepartamentoCodigo,
      departamentoDescripcion: a//emitter.DepartamentoNombre
    }]
};

const data = {
    tipoDocumento: a,
    establecimiento: a,
    punto: a,
    numero: a,
    fecha: a,
    cliente: {
      contribuyente: a,
      ruc: a,
      razonSocial: a
    },
    items: documentData.map(item => ({
      codigo: item.ItemCodigo,
      descripcion: item.ItemDescripcion,
      cantidad: item.Cantidad,
      precioUnitario: item.PrecioUnitario,
      unidadMedida: 77 // 77=Unidad
    }))
  };


/*const xmlGenerator = (params, data, options)=> {
    const xml = xmlgen.default.generateXMLDE(params, data)
                      .then(xml => console.log(xml))
                      .catch(error => {
                        console.log(error);
                      });
}

const xmlTest = xmlGenerator(testParams, testData) */

