
import User from "../../../src/models/User";
import Vehicle from "../../../src/models/Vehicle";
import { generateToken } from "../../../src/utils/jwt";
import { authRequest } from "../../helpers/test.helpers";


describe("DELETE /api/vehicles/:id", () => {
  let adminToken: string;
  let vehicleId: string;

  beforeEach(async () => {
    
    const admin = await User.create({
      name: "Admin User",
      email: "admin_delete@test.com",
      password: "password123",
      role: "admin",
    });
    adminToken = generateToken({ id: admin._id.toString(), role: admin.role });

    
    const vehicle = await Vehicle.create({
      make: "Honda",
      model: "Civic",
      category: "Sedan",
      price: 20000,
      quantity: 2,
    });
    vehicleId = vehicle._id.toString();
  });

  it("should delete a vehicle successfully when requested by an admin", async () => {
    const res = await authRequest(adminToken)
      .delete(`/api/vehicles/${vehicleId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Vehicle deleted successfully");

    
    const deletedVehicle = await Vehicle.findById(vehicleId);
    expect(deletedVehicle).toBeNull();
  });
});