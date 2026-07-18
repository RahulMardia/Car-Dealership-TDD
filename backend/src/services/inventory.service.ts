import Vehicle from "../models/Vehicle";
import { AppError } from "../utils/AppError";

// Purchase api logic
export const purchaseVehicle = async (id: string, quantityToPurchase: number = 1) => {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }

    if (vehicle.quantity < quantityToPurchase) {
        throw new AppError("Not enough stock available", 400);
    }

    vehicle.quantity -= quantityToPurchase;  // Decrease the quantity if purchased
   
    await vehicle.save(); // Save to DB

    return vehicle;
};


// Restock Vehicle api logic(Admin)
export const restockVehicle = async (id: string, quantityToAdd: number = 1) => {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }

    vehicle.quantity += quantityToAdd; // Increase the quantity if restocked
    await vehicle.save(); // Save to DB

    return vehicle;
};