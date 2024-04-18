const onRequest = (config) => {
  config.metadata = { startTime: new Date() };
  return config;
};

const onResponse = (response) => {
  const endTime = new Date();
  const startTime = response.config.metadata.startTime;
  const timeTaken = endTime - startTime;

  const responseBodyString = JSON.stringify(response?.data);
  const responseHeaderString = JSON.stringify(response?.headers);
  const responseBodySize = new Blob([responseBodyString]).size;
  const responseHeaderSize = new Blob([responseHeaderString]).size;

  response.metadata = { timeTaken, responseBodySize, responseHeaderSize };
  return response;
};

const onError = (error) => {
  const endTime = new Date();
  console.log(error);
  const startTime = error.response.config.metadata.startTime;
  const timeTaken = endTime - startTime;
  const responseBodyString = JSON.stringify(error?.response?.data);
  const responseHeaderString = JSON.stringify(error?.response?.headers);
  const responseBodySize = new Blob([responseBodyString]).size;
  const responseHeaderSize = new Blob([responseHeaderString]).size;

  error.response.metadata = { timeTaken, responseBodySize, responseHeaderSize };
  return Promise.reject(error);
};

export { onRequest, onResponse, onError };
