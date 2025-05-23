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

// QR FACTURA
router.get("/qrFactura/:id", sqlController.getQRFacturaControler);

// QR REMISION 
router.get("/qrRemision/:id", sqlController.getQRRemisionControler);

// QR NOTA DE CREDITO 
router.get("/qrNotaCredito/:id", sqlController.getQRNotaCreditoControler);


export default router;