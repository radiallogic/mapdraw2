import React, { useState, useEffect } from "react";

export default function useAPI(
  method: string,
  url: string,
  options?: {},
  body?: {}
) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method,
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
  }, []);

  return { data, loading, error };
}
