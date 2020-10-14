import * as dotenv from "dotenv";

dotenv.config();

import { app } from "./app";

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
