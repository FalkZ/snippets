// import { buildTemplateString, splitOnce, toDashed } from "./index.js";
import buildTemplateString from "./buildTemplateString.js";
import splitOnce from "./splitOnce.js";
import toDashed from "./toDashed.js";

const _ = ([str]) => (v) => v[str]();

export default class extends HTMLElement {
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
