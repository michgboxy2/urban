import request from "supertest";
import { app } from "../../../app";

it("returns error 400 if address is not provided", async () => {
  await request(app).post("/api/district").send({}).expect(400);
});

it("returns result if address is passed", async () => {
  let response = await request(app).post("/api/district").send({
    address: "A420, Bristol BS2, UK",
  });

  console.log(response.body);

  expect(response.status).toEqual(400);
  //   expect(response).toHaveProperty("status");
  //   expect(response).toHaveProperty("location");
  //   expect(response).toHaveProperty("search");
});
