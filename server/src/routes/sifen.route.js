import express from 'express';
import controller from '../controllers/sifen.controller.js'

const router = express.Router();

// Consultar Ruc
router.get("/consulta-ruc", controller.askRuc);

export default router;