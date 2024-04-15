const customizeRequiredMark = (label, required) => {
  return (
    <>
      {label}
      {required.required && <span style={{ color: "red" }}>*</span>}
    </>
  );
};

export default customizeRequiredMark;
