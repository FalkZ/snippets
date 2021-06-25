export default (str, splitter) => {
  const i = str.indexOf(splitter);
  if (i === -1) return [str];
  return [str.slice(0, i), str.slice(i + splitter.length)];
};
