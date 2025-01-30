import express from "express";
import sqlController from "../controllers/sql.controller.js";

const router = express.Router();

router.get("/cdc/:id", sqlController.getDataId)

export default router;