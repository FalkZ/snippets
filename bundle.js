var buildTemplateString = (_strings, ...contents) => {
  const strings = [..._strings];
  let acc = strings.shift();
  contents.forEach((content) => (acc += content + strings.shift()));
  return acc;
};

var splitOnce = (str, splitter) => {
  const i = str.indexOf(splitter);
  if (i === -1) return [str];
  return [str.slice(0, i), str.slice(i + splitter.length)];
};

var even = (num) => num % 2 === 0;

var odd = (num) => !even(num);

var toDashed = (str) => {
  const ret = str
    .split(/([A-Z]+)/g)
    .map((val, i) => {
      if (odd(i)) return "-" + val.toLowerCase();
      return val;
    })
    .join("");

  return ret.startsWith("-") ? ret.replace("-", "") : ret;
};

// import { buildTemplateString, splitOnce, toDashed } from "./index.js";

const _ = ([str]) => (v) => v[str]();

class Element extends HTMLElement {
  css(...contents) {
    const str = buildTemplateString(...contents);

    str
      .split(";")
      .map(_`trim`)
      .filter(Boolean)
      .map((v) => splitOnce(v, ":").map(_`trim`))
      .reduce((last, [key, value]) => {
        if (value !== undefined && this.style[key] === value) return last;
        this.style[key] = value;
        const n = this.getAttribute("style");

        if (last === n)
          console.error(`invalid style property: ${key}: ${value || ""}`);

        return n;
      }, this.getAttribute("style"));
  }

  static createWithName(name, ...options) {
    if (customElements.get(name) === undefined)
      customElements.define(name, this);

    return new (customElements.get(name))(...options);
  }
  static create(...options) {
    let name = toDashed(this.name.trim());
    if (!name.includes("-")) name += "-";
    return this.createWithName(name, ...options);
  }
  static get() {
    const name = toDashed(this.name.trim());
    if (customElements.get(name) === undefined)
      customElements.define(name, this);

    return customElements.get(name);
  }
}

class EventEmitter extends Element {
  on(name, cb) {
    const fn = ({ detail }) => cb(...detail);
    this.addEventListener(name, fn, false);

    const self = this;

    return function removeListener() {
      self.removeEventListener(name, fn);
    };
  }
  trigger(name, ...detail) {
    const event = new CustomEvent(name, { detail });

    this.dispatchEvent(event);
  }
}

var EventEmitter$1 = EventEmitter.get();

export { Element, EventEmitter$1 as EventEmitter, buildTemplateString, even, odd, splitOnce, toDashed };
