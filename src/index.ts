import * as dotenv from "dotenv";

dotenv.config();

import { app } from "./app";

interface Districts {
  crs: {
    properties: {
      name: string;
    };
    type: string;
  };
  features: [
    {
      type: string;
      geometry: {
        type: string;
        coordinates: [[[number, number, number]]];
      };
      properties: {
        Description: string;
        Name: string;
      };
    }
  ];
}

// const fs = require("fs");
// var obj;
// fs.readFile("districts.json", "utf8", function (err: Error, data: string) {
//   if (err) throw err;
//   obj = JSON.parse(data);

//   console.log(JSON.stringify(obj.features[1].geometry.type));
// });

const start = async () => {
  console.log("starting..");

  if (!process.env.googleMapAPI) {
    throw new Error("googleMapAPI must be defined as an environment key");
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
