import request from "supertest";
import app from "../../../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Rahul",
        email: "rahul@test.com",
        password: "Password123",
      });

    expect(res.status).toBe(201);
  });

  
});