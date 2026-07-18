import { AppError } from "../utils/AppError";

import Vehicle from "../models/Vehicle";

// Type Casting
interface CreateVehicle {
    make: string;
    model: string;
    category: string;
    price: string;
    quantity: string;
}

export const createVehicle = async (
    // Data is deconstruting the CreateVehicle Object
    data: CreateVehicle
) => {
    // Adding the vehicle to the database
    const vehicle = await Vehicle.create(data)
    return vehicle;
}

export const getAllVehicles = async (query: any) =>{
    const filter: any = {}

    // Make query and filter
    if (query.make) filter.make = query.make;
    // Model query and filter
    if (query.model) filter.model = query.model;
    // Category query and filter
    if (query.category) filter.category = query.category;

    // Price Range query and filter
    if (query.minPrice || query.maxPrice) {
        filter.price = {};
        if (query.minPrice) filter.price.$gte = Number(query.minPrice);
        if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }

    // Filter data query also returns all data
    return await Vehicle.find(filter);

    // To get all the vehicles
    // return await Vehicle.find()
}

// Update vehicle details
export const updateVehicle = async (id: string, data: any) => {
    
    const vehicle = await Vehicle.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }
    return vehicle;
} 

// Delete vehicle by ID

export const deleteVehicle = async (id: string) => {
    
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
        throw new AppError("Vehicle not found", 404);
    }
    return vehicle;
} 
