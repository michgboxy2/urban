import express from "express";
import { body } from "express-validator";
import { validateRequest } from "@michytickets/common";

import { resolveAddress } from "./districtController";

const router = express.Router();

router.post(
  "/api/district",
  [body("address").not().isEmpty().withMessage("Address is required")],
  validateRequest,
  resolveAddress
);

export { router as districtRouter };
