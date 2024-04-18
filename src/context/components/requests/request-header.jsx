import "../../../styles/request-header-component.css";
import { useContext } from "react";
import { AppContext } from "../..";
import EditButton from "../../../utils/edit-button";

export default function RequestHeaderComponent() {
  const { request } = useContext(AppContext);
  return (
    <section className="request-header-components">
      <EditButton>
        <h1>{request.name}</h1>
      </EditButton>
      <h5>{request?.description}</h5>
    </section>
  );
}
