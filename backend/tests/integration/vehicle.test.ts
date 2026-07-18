import request from "supertest";
import app from "../../src/app";

describe("Vehicle API", () => {
  let token: string;

  beforeAll(async () => {
    await request(app)
    .post("/api/auth/register")
    .send({
      name: "Rahul",
      email: "rahul@test.com",
      password: "123456",
    });

  const login = await request(app)
    .post("/api/auth/login")
    .send({
      email: "rahul@test.com",
      password: "123456",
    });

    token = login.body.token;
  });

  it("should create a new vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("should get all vehicles", async () => {
    const res = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});