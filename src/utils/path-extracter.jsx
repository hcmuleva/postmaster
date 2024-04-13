function PathExtracter(path) {
  const { name, namespace } = path;
  const updatedNamespace = namespace.map((part) => {
    if (!isNaN(Number(part))) {
      return `[${part}]`;
    } else {
      return part;
    }
  });
  updatedNamespace.push(name);
  return updatedNamespace.join(".");
}

export { PathExtracter };
