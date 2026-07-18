import { asyncHandler } from "../utils/asyncHandler";
import * as inventoryService from "../services/inventory.service";

// Purchase Vehicle 
export const purchase = asyncHandler(async (req: any, res: any) => {
    const { quantityToPurchase } = req.body;
    
    const vehicle = await inventoryService.purchaseVehicle(req.params.id, quantityToPurchase);

    res.status(200).json({
        success: true,
        message: "Vehicle purchased successfully!",
        data: vehicle
    });
});

// Restock Vehicle(Admin Only)
export const restock = asyncHandler(async (req: any, res: any) => {
    const { quantityToAdd } = req.body;
    
    const vehicle = await inventoryService.restockVehicle(req.params.id, quantityToAdd);

    res.status(200).json({
        success: true,
        message: "Vehicle restocked successfully!",
        data: vehicle
    });
});