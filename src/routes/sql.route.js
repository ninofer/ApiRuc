import express from "express";
import sqlController from "../controllers/sql.controller.js";

const router = express.Router();

//Para Id
// router.get("/:id", sqlController.getDataId);

//Para interger
// router.get("/interger/:id", sqlController.getDataS);

//armar json params
// router.get("/parametros/:id", sqlController.parametrosJson);

//armar json dataparams
// router.get("/xmlDataParams/:id", sqlController.parametrosDataJson);

router.get("/xml/:id", sqlController.getXMLControler)

// QR FACTURA
router.get("/qrFactura/:id", sqlController.getQRFacturaControler);

// QR FACTURA EXPORTACION
router.get("/qrFacturaExportacion/:id", sqlController.getQRFacturaExportacionControler)

// QR REMISION 
router.get("/qrRemision/:id", sqlController.getQRRemisionControler);

// QR REMISION EXPORTACION
router.get("/qrRemisionExportacion/:id", sqlController.getQRRemisionExportacionControler)

export default router;