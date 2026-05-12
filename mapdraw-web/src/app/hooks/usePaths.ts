import useGET from "./useGET";

export default function useRoutes(trip_id: number) {
  return useGET("/api/routes?id=" + trip_id);
}
