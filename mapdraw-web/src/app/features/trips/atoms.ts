import { atom } from "jotai";
import { Trip } from "./types";
import { getRandomPosition } from "@/lib/getRandomPosition";

const trip = {
  id: 0,
  name: "Empty",
  vehicle: "",
  location: getRandomPosition(),
  userId: 0,
};

export const currentTripAtom = atom<Trip>(trip);
