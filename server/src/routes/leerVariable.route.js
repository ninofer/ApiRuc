import express from "express";
import controller from "../controllers/variable.controller.js";

const router = express.Router();

// Consultar Ruc
router.get("/variable", controller.getValorVariable);

export default router;