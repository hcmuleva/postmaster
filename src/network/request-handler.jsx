import { useState } from "react";

function useRequestHandler() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const fetchData = async (request) => {
    try {
      const response = await fetch(request.url);
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useRequestHandler;
