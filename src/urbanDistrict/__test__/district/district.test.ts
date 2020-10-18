import request from "supertest";
import { app } from "../../../app";
import { client } from "../../cache";
import { checkCache } from "../../districtController";

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

it("fetches response from cache if address exists in cache", async () => {
  const address = "A420, Bristol BS2, UK";
  let response = await request(app).post("/api/district").send({
    address,
  });

  client.get(address, (err, data) => {
    if (data != null) {
      expect(response.body).toEqual(JSON.parse(data));
    }
  });
});
