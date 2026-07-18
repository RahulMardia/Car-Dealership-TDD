import { Router } from "express";
import * as vehicleController from "../controllers/vehicle.controller"
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";
import inventoryRoutes from "../routes/inventory.routes"


const router = Router();

// Api route for Creating Vehicles(POST)
router.post('/', authenticate, authorizeAdmin, vehicleController.createVehicle);

// Api route for Getting Vehicles(GET)
router.get('/',authenticate,vehicleController.getAllVehicles);

// Update vehicle data from ID
router.put('/:id', authenticate, authorizeAdmin, vehicleController.updateVehicle);

// Delete Vehicle using ID
router.delete('/:id',authenticate, authorizeAdmin, vehicleController.deleteVehicle);

router.use('/:id',inventoryRoutes);
export default router;