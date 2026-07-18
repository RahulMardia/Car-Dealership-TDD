import request from "supertest";
import User from "../../../src/models/User";
import { generateToken } from "../../../src/utils/jwt";
import Vehicle from "../../../src/models/Vehicle";
import app from "../../../src/app";
import { authRequest } from "../../helpers/test.helpers";


describe("PUT /api/vehicles/:id", () => {
  let adminToken: string;
  let vehicleId: string;

  beforeEach(async () => {
    
    const admin = await User.create({
      name: "Admin User",
      email: "admin@test.com",
      password: "password123", 
      role: "admin",
    });
    adminToken = generateToken({ id: admin._id.toString(), role: admin.role });

    const vehicle = await Vehicle.create({
      make: "Toyota",
      model: "Camry",
      category: "Sedan",
      price: 25000,
      quantity: 5,
    });
    vehicleId = vehicle._id.toString();
  });

  it("should update a vehicle successfully when requested by an admin", async () => {
    const updateData = { price: 22000, quantity: 10 };

   const res = await authRequest(adminToken)
      .put(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send(updateData);

   
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.price).toBe(22000);
    expect(res.body.data.quantity).toBe(10);
    
   
    const updatedVehicle = await Vehicle.findById(vehicleId);
    expect(updatedVehicle?.price).toBe(22000);
  });
});