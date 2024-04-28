import "./method-text.css";

const methodColors = {
  POST: "yellow",
  GET: "green",
  PUT: "blue",
  DELETE: "red",
};

export default function MethodText({ text, size }) {
  const colorClass = methodColors[text] || "";

  return (
    <p className={`method-icon-txt ${colorClass}`} style={{ fontSize: size }}>
      <span>{text}</span>
    </p>
  );
}

function getAllMethodTexts() {
  return Object.values(methodColors);
}

function getAllMethods() {
  return Object.keys(methodColors);
}

export { getAllMethodTexts, getAllMethods, methodColors };
