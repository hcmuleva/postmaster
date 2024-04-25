import "../../../styles/request-header-component.css";
import { useContext } from "react";
import { AppContext } from "../..";
import { EditButton } from "../../../utils/buttons";

export default function RequestHeaderComponent() {
  const { request } = useContext(AppContext);
  const { changeRequestModalState, setRequestUpdateModeData } =
    useContext(AppContext);
  function handleClick(e) {
    changeRequestModalState(true);
    setRequestUpdateModeData(request);
  }
  return (
    <section className="request-header-components">
      <EditButton handleClick={handleClick}>
        <h1>{request.name}</h1>
      </EditButton>
      <h5>{request?.description}</h5>
    </section>
  );
}
