import "../../../styles/request-header-component.css";
import { useContext } from "react";
import { AppContext } from "../..";

export default function RequestHeaderComponent() {
  const { request } = useContext(AppContext);
  return (
    <section className="request-header-components">
      <h1>{request.name}</h1>
    </section>
  );
}
