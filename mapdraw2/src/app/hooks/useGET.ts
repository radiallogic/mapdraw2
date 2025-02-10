import useAPI from "./useAPI";

export default function useGET(url: string, options?: {}) {
  return useAPI("GET", url, options);
}
