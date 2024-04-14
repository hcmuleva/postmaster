import { useCreate } from "@refinedev/core";
const CreateProvider = () => {
  const { mutate } = useCreate();
  function createProviderFunc({ values, resource }) {
    return mutate({
      resource,
      values,
      invalidates: ["*"],
    });
  }
  return { createProviderFunc };
};

export default CreateProvider;
