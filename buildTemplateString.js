export default (_strings, ...contents) => {
  const strings = [..._strings];
  let acc = strings.shift();
  contents.forEach((content) => (acc += content + strings.shift()));
  return acc;
};
