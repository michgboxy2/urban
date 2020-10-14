import express from "express";
import { json, urlencoded } from "body-parser";
import { errorHandler } from "@michytickets/common";

import { districtRouter } from "./urbanDistrict/districtRouter";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  urlencoded({
    extended: false,
  })
);

app.use(districtRouter);

app.all("*", async (req, res) => {
  return res.status(404).send({ message: "page not found", status: "failed" });
});

app.use(errorHandler);

export { app };
