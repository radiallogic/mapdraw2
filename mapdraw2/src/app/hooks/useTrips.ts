import useGET from "./useGET";

export default function useTrips() {
  return useGET("/api/trips/");
}
