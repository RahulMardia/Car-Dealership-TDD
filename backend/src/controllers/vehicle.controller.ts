import { asyncHandler } from "../utils/asyncHandler";
import * as vehicleService from "../services/vehicle.service";

// Create vehicle
export const createVehicle = asyncHandler(async (req: any, res: any) => {
  const vehicle = await vehicleService.createVehicle(req.body);

  res.status(201).json({
    success: true,
    message: "Vehicle created successfully",
    data: vehicle,
  });
});

// Get all vehicles data
export const getAllVehicles = asyncHandler(async (req: any, res: any) => {
  // Used req.query for passing the query from service to controller
  const vehicles = await vehicleService.getAllVehicles(req.query);
  
  res.status(200).json({
    success: true,
    data: vehicles,
  });
});

// Update Vehicle
export const updateVehicle = asyncHandler(async (req: any, res: any) => {
  
 const vehicle = await vehicleService.updateVehicle(
    req.params.id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Vehicle updated successfully",
    data: vehicle,
  });
});

// Delete Vehicle 
export const deleteVehicle = asyncHandler(async (req: any, res: any) => {
  
 const vehicle = await vehicleService.deleteVehicle(
    req.params.id,

  );
  res.status(200).json({
    success: true,
    message: "Vehicle deleted successfully",
    data: vehicle,
  });
});