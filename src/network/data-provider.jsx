import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context";
const API_URL = import.meta.env.VITE_SERVER_URL;

const useData = (initialData) => {
  const [data, setData] = useState(initialData);
  const [dataCount, setDataCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refetch, updateRefetchStatus } = useContext(AppContext);
  const extractStepData = (stepData) => {
    return stepData.map((step) => {
      return { id: step.id, ...step.attributes };
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL + "/api/scenarios", {
        params: {
          populate: "steps",
        },
      });
      const { data } = response.data;
      const newData = data.map((scenario) => {
        const stepData = extractStepData(scenario?.attributes?.steps?.data);
        return {
          id: scenario?.id,
          ...scenario?.attributes,
          steps: stepData,
        };
      });
      setData(newData);
      setDataCount(newData.length);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refetch) {
      updateRefetchStatus(false);
    }
    fetchData();
    return () => {};
  }, [refetch]);

  return { data, dataCount, loading, error };
};

export default useData;
