import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = <T>(
  url: string
): { data: T | undefined; loading: boolean; error: Error | undefined } => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    axios
      .get<T>(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [url]);

  return { data, loading, error };
};
