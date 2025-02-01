import express from "express";
import sqlController from "../controllers/sql.controller.js";

const router = express.Router();

//Para Id
router.get("/:id", sqlController.getDataId);

//Para interger
router.get("/interger/:id", sqlController.getDataS);

//armar json params
router.get("/xmlGen/:id", sqlController.getDataS);

export default router;
