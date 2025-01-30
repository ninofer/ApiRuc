import xmlgen from "facturacionelectronicapy-xmlgen"

import { testData, testParams } from "./paramsData.js"

const xmlGenerator = (params, data, options)=> {
    const xml = xmlgen.default.generateXMLDE(params, data)
                      .then(xml => console.log(xml))
                      .catch(error => {
                        console.log(error);
                      });
}

const xmlTest = xmlGenerator(testParams, testData) 

