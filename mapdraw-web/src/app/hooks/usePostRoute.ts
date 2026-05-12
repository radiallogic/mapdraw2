import usePOST from "./usePOST";
import { type route } from "../core_types";

export default function usePostPath() {
  const postroute = (route: route) => {
    return usePOST("/api/route", route);
  };

  return postroute;
}
