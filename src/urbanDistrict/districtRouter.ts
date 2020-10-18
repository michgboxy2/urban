import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@michytickets/common";

import { resolveAddress, checkCache } from "./districtController";

const router = express.Router();

router.post(
  "/api/district",
  [
    body("address")
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage("Address is required"),
  ],
  validateRequest,
  checkCache,
  resolveAddress
);

export { router as districtRouter };
