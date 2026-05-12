import useGET from "../../hooks/useGET";
import usePOST from "../../hooks/usePOST";
import { type Path } from "./types";

export function usePaths() {
  const { data = [], loading, error } = useGET<Path>("/api/paths");
  return { data, loading, error };
}

export function usePostPath() {
  const { data, loading, error, post } = usePOST({
    url: "/api/paths",
  });

  const postPath = async (path: Path) => {
    return post(path);
  };

  return { postPath, data, loading, error };
}
