import { useState, useEffect } from "react";
import { useList } from "@refinedev/core";

const useData = (initialData) => {
  const [data, setData] = useState(initialData);
  const [dataCount, setDataCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data: scenarioData,
    isLoading,
    que,
  } = useList({
    resource: "scenarios",
    meta: {
      populate: "*",
    },
  });

  const fetchData = () => {
    try {
      setData(scenarioData.data);
      setDataCount(scenarioData.total);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scenarioData && !isLoading) {
      fetchData();
    }
    return () => {};
  }, [scenarioData, isLoading]);

  return { data, dataCount, loading, error };
};

export default useData;
