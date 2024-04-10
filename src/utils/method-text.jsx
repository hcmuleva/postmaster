import "./method-text.css";
export default function MethodText({ text }) {
  if (text === "POST") {
    return <p  className="method-icon-txt yellow">{text}</p>;
  } else if (text === "GET") {
    return <p  className="method-icon-txt green">{text}</p>;
  } else if (text === "PUT") {
    return <p  className="method-icon-txt blue">{text}</p>;
  } else if (text === "DELETE") {
    return <p  className="method-icon-txt red">{text}</p>;
  } else {
    return <p ></p>;
  }
}
