import { useState, useEffect } from "react";
import ScenariosData from "../mock/scenarios.json";
const useData = (initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setData(ScenariosData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return { data, loading, error };
};

export default useData;
