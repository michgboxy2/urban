import request from "supertest";
import { app } from "../../../app";

it("returns error 400 if address is not provided", async () => {
  await request(app).post("/api/district").send({}).expect(400);
});

it("returns detailed district search result if address within the district is passed", async () => {
  let response = await request(app).post("/api/district").send({
    address: "A420, Bristol BS2, UK",
  });

  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("status");
  expect(response.body).toHaveProperty("location");
  expect(response.body).toHaveProperty("search");
});

it("returns a not found result if address passed is not within the districts", async () => {
  let response = await request(app).post("/api/district").send({
    address: "Ajah, lagos, Nigeria",
  });

  expect(response.status).toEqual(200);
  expect(response.body).toHaveProperty("status");
  expect(response.body.status).toEqual("NOT_FOUND");
});
