import { Router } from "express";
import * as vehicleController from "../controllers/vehicle.controller"
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Api route for Creating Vehicles(POST)
router.post('/', authenticate, vehicleController.createVehicle);

// Api route for Getting Vehicles(GET)
router.get('/',authenticate,vehicleController.getAllVehicles);

export default router;