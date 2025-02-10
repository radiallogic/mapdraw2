import useGET from "./useGET";

export default function useSites(trip_id: number) {
  return useGET("/api/sites?id=" + trip_id);
}
