import { useUpdate } from "@refinedev/core";

const useUpdateHook = () => {
  const { mutate } = useUpdate();

  const updateRequest = ({ values, id }) => {
    return mutate({
      resource: "steps",
      values: { ...values },
      id,
      invalidates: ["steps", "scenarios"],
    });
  };

  return { updateRequest };
};

const updateRequestObjectCreater = (modifiedDataObject) => {
  const newValues = {};
  for (const field in modifiedDataObject) {
    newValues[field] = modifiedDataObject[field].newValue;
  }
  return newValues;
};

export { updateRequestObjectCreater };

export default useUpdateHook;
