import request from "supertest";
import app from "../../../src/app";

describe("Auth API", () => {
  it("should login successfully", async () => {
    // Register the user for this test
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Rahul",
        email: "rahullogin@test.com",
        password: "Password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "rahullogin@test.com",
        password: "Password123",
      });

    expect(res.status).toBe(200);
  });
});