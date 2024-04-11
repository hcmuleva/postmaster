import RequestForm from "../../form/request-form";
import RequestHeaderComponent from "./request-header";
import RequestHeaderOptions from "./request-header-option";
export default function Request() {
  return (
    <>
      <RequestHeaderComponent />
      <RequestHeaderOptions />
      <RequestForm />
    </>
  );
}
