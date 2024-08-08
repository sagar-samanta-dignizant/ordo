export const classNames = (...allClasses) => {
  const newClasses = allClasses.filter((c) => c);
  return newClasses.join(" ");
};
