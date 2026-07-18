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


  describe("POST /api/vehicles/:id/restock", () => {
    it("should allow an admin to restock a vehicle", async () => {
      const res = await request(app)
        .post(`/api/vehicles/${vehicleId}/restock`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ quantityToAdd: 5 });

      expect(res.status).toBe(200);
      

      const updatedVehicle = await Vehicle.findById(vehicleId);
      expect(updatedVehicle?.quantity).toBe(10);
    });
  });
});