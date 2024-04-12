function PathExtracter(path) {
  const { name, namespace } = path;
  const updatedNamespace = [...namespace, name];
  console.log(updatedNamespace.join('.'));
  return updatedNamespace.join(".");
}

export { PathExtracter };
