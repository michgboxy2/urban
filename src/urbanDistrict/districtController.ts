import express, { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@michytickets/common";
import rp from "request-promise";
import { isPointInPolygon } from "geolib";

const { googleMapAPI } = process.env;
import formattedDistrict from "../districts.json";
import { GeolibInputCoordinates } from "geolib/es/types";

const isPointInDistrict = async (
  coord: GeolibInputCoordinates,
  polygon: any
) => {
  console.log(
    isPointInPolygon(
      [51.5125, 7.485, 0],
      [
        [51.5, 7.4, 0],
        [51.555, 7.4, 0],
        [51.555, 7.625, 0],
        [51.5125, 7.625, 0],
      ]
    )
  );
  return isPointInPolygon(coord, polygon);
};

const getCoordinates = async (address: string, res: Response) => {
  let data = await rp(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyC7NY1rvGjGw8PXbLAB8Gtc1PuZ_h5puYY`
    // `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.googleMapAPI}`
  );
  return JSON.parse(data).results[0].geometry.location;
};

const getDistrict = async (lat: number, lng: number, address: string) => {
  const { features } = formattedDistrict;

  features.map((feature) => {
    feature.geometry.coordinates.map(async (coordinate) => {
      let checkIfPolyGon = await isPointInDistrict([lat, lng], coordinate);

      if (checkIfPolyGon === true) {
        return feature;
      }
    });
  });
  return {
    status: "NOT_FOUND",
    search: address,
  };
};

export const resolveAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address } = req.body;

  try {
    const { lat, lng } = await getCoordinates(address.trim(), res);

    if (!lat || !lng) {
      throw new BadRequestError("can't get coordinates");
    }

    let data = await getDistrict(lat, lng, address.trim());

    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(422).send("shit happened");
  }
};
