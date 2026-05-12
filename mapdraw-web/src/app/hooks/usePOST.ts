import { useState } from "react";

export type APIReturn = { data: {}; loading: boolean; error: string };

export default function usePOST({
  url,
  options,
}: {
  url: string;
  options?: {};
}) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (body: {}) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
      ...options,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return { post, data, loading, error };
}
