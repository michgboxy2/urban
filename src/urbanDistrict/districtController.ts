import { Request, Response, NextFunction } from "express";
import rp from "request-promise";
import { isPointInPolygon } from "geolib";

const { googleMapAPI } = process.env;
import formattedDistrict from "../districts.json";
import { GeolibInputCoordinates } from "geolib/es/types";

interface Geocode {
  status: string;
  search: string;
  location: {
    address: string;
    city: string;
    lat: number;
    lng: number;
    postcode: string;
    serviceArea: string;
  };
}

var status: boolean;

export const isPointInDistrict = async (
  coord: GeolibInputCoordinates,
  polygon: any
) => {
  return isPointInPolygon(coord, polygon);
};

export const getCoordinates = async (address: string, res: Response) => {
  let data = await rp(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapAPI}`
  );
  return JSON.parse(data).results[0];
};

export const getDistrict = async (
  lat: number,
  lng: number,
  georesult: Geocode,
  res: Response,
  address: string
) => {
  const { features } = formattedDistrict;

  for (let i = 0; i < features.length; i++) {
    for (let j = 0; j < features[i].geometry.coordinates.length; j++) {
      let checkIfPolyGon = await isPointInDistrict(
        [lat, lng],
        features[i].geometry.coordinates[j]
      );
      if (checkIfPolyGon == true) {
        georesult.location.serviceArea = features[i]!.properties?.Name;
        return georesult;
      }
    }
  }

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
    const search = await getCoordinates(address.trim(), res);

    if (!search) {
      return res.status(400).send({
        message: "unable to convert address to coordinate",
        status: "failed",
      });
    }

    const { lat, lng } = search.geometry.location;

    if (!lat || !lng) {
      return res
        .status(400)
        .send({ message: "lng and lat are required", status: "failed" });
    }

    let georesult = {
      status: "OK",
      search: search.address_components[4].long_name,
      location: {
        address: search.formatted_address,
        city: search.address_components[3].long_name,
        lat,
        lng,
        postcode: search.address_components[4].long_name,
        serviceArea: "",
      },
    };

    const data = await getDistrict(lng, lat, georesult, res, address);

    return res.status(200).send(data);
  } catch (error) {
    return res
      .status(422)
      .send({ message: "something went wrong", status: "failed", error });
  }
};
