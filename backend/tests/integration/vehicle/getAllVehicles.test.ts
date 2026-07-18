import { authRequest, createTestUser } from "../../helpers/test.helpers";

describe("Vehicle API", () => {
  let token: string;

  beforeAll(async () => {
    const auth = await createTestUser();
    token = auth.token;
  });
  it("should get all vehicles", async () => {
    const res = await authRequest(token)
      .get("/api/vehicles");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});