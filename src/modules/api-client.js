import Params from "./params.js";

export class ApiClient {

  #params = null;

  constructor(params) {
    this.#params = params || Params.create();
  }

  static create() {
    return new ApiClient();
  }

  request(query) {
    return new Promise((resolve, reject) => {
      let url = new URL(this.#params.endpoint);
      let options = {
        method: "POST",
        body: query,
        headers: {
          "User-Agent": this.#params.userAgent,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        signal: AbortSignal.timeout(this.#params.timeout),
      };

      switch (this.#params.format) {
        case "geojson":
        case "json":
          options.body = "[out:json];\n" + options.body;
          options.headers.Accept = "application/json";
          break;

        case "xml":
          options.headers.Accept = "application/xml";
          break;
      }

      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            reject(new Error(`HTTP error [${response.status}]: ${response.statusText}`));
          }
          return response.text();
        })
        .then(data => data.trim())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}
export default ApiClient;
