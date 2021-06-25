import odd from "./odd.js";

export default (str) => {
  const ret = str
    .split(/([A-Z]+)/g)
    .map((val, i) => {
      if (odd(i)) return "-" + val.toLowerCase();
      return val;
    })
    .join("");

  return ret.startsWith("-") ? ret.replace("-", "") : ret;
};
