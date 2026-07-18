import User from "../../../src/models/User";
import { generateToken } from "../../../src/utils/jwt";
import { authRequest, createTestUser } from "../../helpers/test.helpers";

describe("Vehicle API", () => {
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
  });
  
  it("should create a new vehicle", async () => {
    const res = await authRequest(adminToken)
      .post("/api/vehicles")
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

});