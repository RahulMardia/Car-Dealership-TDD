import User from "../models/User";
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
    data: CreateVehicle,
    userId: string,
) => {
    // Adding the owner key to the data itself
    const vehicle = await Vehicle.create({ ...data, owner: userId })
    return vehicle;
}

export const getAllVehicles = async () =>{
    // To get all the vehicles
    return await Vehicle.find()
}