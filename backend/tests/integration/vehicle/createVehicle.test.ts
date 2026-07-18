import { authRequest, createTestUser } from "../../helpers/test.helpers";

describe("Vehicle API", () => {
  let token: string;

  beforeAll(async () => {
    const auth = await createTestUser();
    token = auth.token;
  });

  it("should create a new vehicle", async () => {
    const res = await authRequest(token)
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