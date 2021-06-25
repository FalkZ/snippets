import { Element } from "./index0.js";

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

export default EventEmitter.get();
