import usePOST from "./usePOST";

export default function usePostPath() {
  const postpath = (path: path) => {
    return usePOST("/api/path", path);
  };

  return postpath;
}
