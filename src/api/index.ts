import axios from "axios";

export type PlanetType = {
  name: string;
  tagline: string;
  tagline_icon: string;
  picture: string;
  textureUrl: string;
  description: string;
  distanceFromSun: string;
  yearLength: string;
  numberOfMoons: number;
  namesake: string;
  rings: Rings;
  spaceTexture_url: string;
  modelSize: number;
  auDistance: number;
};

export type Rings = {
  url_exists: boolean;
};

export const client = axios.create({
  baseURL: "https://rasp.kedywonline.uk",
});
