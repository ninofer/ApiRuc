import express from "express";
import sqlController from "../controllers/sql.controller.js";

const router = express.Router();

//Para Id
router.get("/:id", sqlController.getDataId);

//Para interger
router.get("/interger/:id", sqlController.getDataS);

//armar json params
router.get("/parametros/:id", sqlController.parametrosJson);

//armar json dataparams
router.get("/xmlDataParams/:id", sqlController.parametrosDataJson);

router.get("/xml/:id", sqlController.getXMLControler)

//armar XML completo
router.get("/qr/:id", sqlController.getQRControler);

export default router;