const status = {
  200: { name: "OK", type: "success" },
  201: { name: "Created", type: "success" },
  204: { name: "No Content", type: "success" },
  400: { name: "Bad Request", type: "error" },
  401: { name: "Unauthorized", type: "error" },
  403: { name: "Forbidden", type: "error" },
  404: { name: "Not Found", type: "error" },
  405: { name: "Method Not Allowed", type: "error" },
  500: { name: "Internal Server Error", type: "error" },
  502: { name: "Bad Gateway", type: "error" },
  503: { name: "Service Unavailable", type: "error" },
};

export default function RequestStatus({ code }) {
  const statusInfo = status[code];
  if (!statusInfo) {
    return null;
  }
  const { name, type } = statusInfo;
  const colorClass = type || "";
  return (
    <p className={`request-code-text ${colorClass}`}>
      {code} {name}
    </p>
  );
}
