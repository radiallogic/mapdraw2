import useGET from "./useGET";

export default function usePaths(trip_id: number) {
  return useGET("/api/paths?id=" + trip_id);
}
