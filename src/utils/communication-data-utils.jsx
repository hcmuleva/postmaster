const communicationDataType = {
  RESPONSE: {
    bodySubType: "BODY",
    headerSubType: "HEADER",
  },
  REQUEST: {
    bodySubType: "BODY",
    headerSubType: "HEADER",
  },
};

const communicationDataTypeKeys = Object.keys(communicationDataType);
const getCommunicationDataSubType = (type) =>
  Object.values(communicationDataType[type]);

export {
  communicationDataType,
  communicationDataTypeKeys,
  getCommunicationDataSubType,
};
