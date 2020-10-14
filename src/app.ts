import express from "express";
import { readFile } from "fs";
import { json, urlencoded } from "body-parser";
import { errorHandler, NotFoundError } from "@michytickets/common";
import data from "./districts.json";

import { districtRouter } from "./urbanDistrict/districtRouter";
import { isPointInPolygon } from "geolib";

// let is = isPointInPolygon(
//   [51.5125, 7.485],
//   [
//     [51.5, 7.4],
//     [51.555, 7.4],
//     [51.555, 7.625],
//     [51.5125, 7.625],
//   ]
// );

// let is = isPointInPolygon(
//   [51.53189489745622, -0.10409183328645],
//   [
//     [51.53189499745622, -0.10419183328645],
//     [51.53195109087022, -0.104237011628754],
//     [51.53208440726962, -0.104659611152101],
//     [51.53208619152458, -0.104662153535514],
//   ]
// );
// console.log(is);
// data.features.map((feature) => {
//   feature.geometry.coordinates.map((coordinate) => {
//     console.log(coordinate);
//   });
// });

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
  //   throw new NotFoundError();
  return res.status(404).send({ message: "page not found" });
});

app.use(errorHandler);

export { app };
