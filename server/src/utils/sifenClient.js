import soap from 'soap';
import fs from 'fs';
import forge from 'node-forge';
import { SignedXml } from 'xml-crypto';

const SIFEN_WSDL = "http://ekuatia.set.gov.py/sifen/wsd?wsdl";  // URL del WSDL del servicio Web de prueba
const CERT_PATH = "./src/certs/RAMON_MYSKO_RUBEN_VIT_S_A.pfx";
const CERT_PASSWORD = process.env.CERT_PASSWORD

const loadCertificate = () => {
    const pfx = fs.readFileSync(CERT_PATH); // Aqui leo el archivo PFX
    const p12Asn1 = forge.asn1.fromDer(pfx.toString("binary")); // Convierto el contenido del archivo al formato ASN.1
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, CERT_PASSWORD); // Extrae la informacion del certificado utilizando la contrasena

    // Obtengo las claves y certificado
    const keyBag = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag][0];
    const certBag = p12.getBags({ bagType: forge.pki.certBag })[forge.pki.oids.certBag][0];

    //Convierto a formato PEM y retorno.
    return {
        privateKey: forge.pki.privateKeyToPem(keyBag.key),
        certificate: forge.pki.certificateToPem(certBag.cert),
    }; 
}

const signXML = (xml, privateKey, certificate) => {

    const signer = new SignedXml(); // Creo un objeto de firma

    signer.addReference("//*[local-name(.)='rEnviConsRUC']", [
        "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
    ]); //Aqui defino que parte del XML firmar (apunta el nodo <rEnviConsRUC>) 

    signer.signingKey = privateKey;
    signer.keyInfoProvider = {
        getKeyInfo: () => `<X509Certificate>${certificate}</X509Certificate>`
    };
    signer.computeSignature(xml);
    return signer.getSignedXml();
}

export const consultarRuc = async (id, ruc) => {
    try {
        //Crear un cliente SOAP desde el WSDL
        const client = await soap.createClientAsync(SIFEN_WSDL);
        const { privateKey, certificate } = loadCertificate();

        const xml = `
            <rEnviConsRUC xmlns="http://ekuatia.set.gov.py/sifen/xsd">
                <dId>${id}</dId>
                <dRUCCons>${ruc}</dRUCCons>
            </rEnviConsRUC>"
        `;

        const signedXml = signXML(xml, privateKey, certificate);
        const [response] = await client.rEnviConsRUCAsync({ rEnviConsRUC: signedXml });
        return response.rResEnviConsRUC;

    } catch (error) {
        throw new Error(`Error al consultar el RUC: ${error.message}`)
    }
}