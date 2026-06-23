import * as core from "@actions/core";

export class Params {
  #defaults = {
    "endpoint": "https://overpass-api.de/api/interpreter",
    "timeout": 30000,
    "format": "geojson",
    "user-agent": "GitHub Action +https://github.com/Flossiraptor/QueryOverpassAction",
  }

  static create() {
    return new Params();
  }

  get dest() {
    return this.#get("dest");
  }
  get query() {
    return this.#get("query");
  }
  get endpoint() {
    return this.#get("endpoint");
  }
  get timeout() {
    return parseInt(this.#get("timeout"));
  }
  get format() {
    return this.#get("format");
  }
  get userAgent() {
    return this.#get("user-agent");
  }

  #get(name) {
    if (this.#has(name)) {
      return core.getInput(name);
    }
    return this.#defaults[name];
  }
  #has(name) {
    return typeof process.env[this.#inputName(name)] !== 'undefined';
  }
  #inputName(name) {
    return `INPUT_${name.replace(/ /g, '_').toUpperCase()}`;
  }
}
export default Params;
