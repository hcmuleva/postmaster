import RequestForm from "../../form/request-form";
import "../../../styles/request-header-component.css";

export default function RequestHeaderComponent({ requestData }) {
  return (
    <section className="request-header-components">
      <h1>{requestData?.url}</h1>
      <RequestForm />
    </section>
  );
}
