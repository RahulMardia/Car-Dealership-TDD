import Vehicle from "../../../src/models/Vehicle";
import { authRequest, createTestUser, sampleVehicles } from "../../helpers/test.helpers";



describe("GET /api/vehicles (Search & Filter)", () => {
  let token: string;
  let auth: any
  beforeAll(async () => {
    auth = await createTestUser();
    token = auth.token;
  });

  beforeEach(async () => {
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(sampleVehicles.map(vehicle => ({
    ...vehicle,
    owner: auth.user._id,
  })));
  });

  it("should filter vehicles by make", async () => {
    const res = await authRequest(token)
      .get("/api/vehicles?make=Toyota");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].make).toBe("Toyota");
    expect(res.body.data[0].model).toBe("Camry");
  });
});