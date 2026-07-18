import request from "supertest";
import {generateToken} from "../../../src/utils/jwt";

import User from "../../../src/models/User";
import Vehicle from "../../../src/models/Vehicle";
import app from "../../../src/app";


describe("Inventory APIs", () => {
  let userToken: string;
  let adminToken: string;
  let vehicleId: string;

  beforeEach(async () => {
    
    const user = await User.create({ name: "Normal User", email: "user@test.com", password: "password", role: "user" });
    userToken = generateToken({ id: user._id.toString(), role: user.role });

   
    const admin = await User.create({ name: "Admin", email: "admin@test.com", password: "password", role: "admin" });
    adminToken = generateToken({ id: admin._id.toString(), role: admin.role });

    
    const vehicle = await Vehicle.create({ make: "Ford", model: "Mustang", category: "Sports", price: 30000, quantity: 5 });
    vehicleId = vehicle._id.toString();
  });

  describe("POST /api/vehicles/:id/purchase", () => {
    it("should allow an authenticated user to purchase a vehicle and decrease stock", async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantityToPurchase: 2 });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      

      const updatedVehicle = await Vehicle.findById(vehicleId);
      expect(updatedVehicle?.quantity).toBe(3);
    });

    it("should return a 400 error if trying to purchase more than available stock", async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({ quantityToPurchase: 10 }); 

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Not enough stock available");
    });
  });

  
});