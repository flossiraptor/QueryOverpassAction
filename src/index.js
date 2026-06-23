import * as core from '@actions/core';
import * as fs from 'fs';
import osmtogeojson from 'osmtogeojson';

import ApiClient from "./modules/api-client.js"
import Params from "./modules/params.js";

try {
  const query = core.getInput("query");
  const dest = core.getInput("dest");
  const client = ApiClient.create();
  const params = Params.create();

  core
    .summary
    .addDetails("Query", query);

  client
    .request(query)
    .then(responseBody => {
      if (params.format == "geojson") {
        return JSON.stringify(osmtogeojson(JSON.parse(responseBody)), null, 2);
      }
      return responseBody;
    })
    .then(result => {
      fs.writeFile(dest, result, error => {
        if (error) {
          core.setFailed(error.message);
        }
      });
    });
} catch (error) {
  core.setFailed(error.message);
}
