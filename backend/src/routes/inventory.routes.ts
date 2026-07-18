import { Router } from "express";
import * as inventoryController from "../controllers/inventory.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";

// mergeParams to get id/data from parent 
const router = Router({ mergeParams: true });

// POST reduce from stock if purchased
router.post('/purchase', authenticate, inventoryController.purchase);

// POST increase in stock if restocked (Admin Only)
router.post('/restock', authenticate, authorizeAdmin, inventoryController.restock);

export default router;