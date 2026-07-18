import { asyncHandler } from "../utils/asyncHandler";
import * as vehicleService from "../services/vehicle.service";

// Create vehicle
export const createVehicle = asyncHandler(async (req: any, res: any) => {
  const vehicle = await vehicleService.createVehicle(
    req.body,
    req.user.id
  );

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