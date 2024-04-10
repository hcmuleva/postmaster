import RequestHeaderComponent from "./request-header";

export default function Request({ requestData }) {
  return (
    <>
      <RequestHeaderComponent requestData={requestData} />
    </>
  );
}
