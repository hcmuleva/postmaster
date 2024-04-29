import axios from "axios";
import { useState } from "react";
import { onError, onRequest, onResponse } from "./axios-interseptor";

function useRequestHandler() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const axiosInstace = axios.create();

  axiosInstace.interceptors.request.use(onRequest, onError);
  axiosInstace.interceptors.response.use(onResponse, onError);

  const getHeaderOptionsObject = (headerOptions) => {
    const headerOptionObject = headerOptions?.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    return headerOptionObject;
  };

  const getParsedRequestBody = async (requestBody) => {
    return Object.keys(requestBody).length > 0
      ? await JSON.parse(requestBody)
      : undefined;
  };

  const fetchData = async (request, headerOptions, requestBody) => {
    const { url, method } = request;
    const headers = getHeaderOptionsObject(headerOptions);
    const parsedRequestBody = await getParsedRequestBody(requestBody);
    try {
      const response = await axiosInstace({
        baseURL: url,
        method,
        headers,
        data: parsedRequestBody,
      });
      setData(response);
      return response;
    } catch (error) {
            setError(error);
      setData(error.response);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}

export default useRequestHandler;
