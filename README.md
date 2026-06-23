# Query Overpass

This is a GitHub action which will query OpenStreetMap using OverpassQL.

Source: <https://github.com/Flossiraptor/QueryOverpassAction>

## Parameters

| Parameter  | Meaning                                    | Default                                                              |
| ---------- | ------------------------------------------ | -------------------------------------------------------------------- |
| dest       | Filename where the geodata should be saved |                                                                      |
| query      | Overpass QL query                          |                                                                      |
| endpoint   | URL of the Overpass API server             | `https://overpass-api.de/api/interpreter`                            |
| format     | Output format: xml/json/geojson            | `geojson`                                                            |
| timeout    | Maximum query time (in milliseconds)       | `30000`                                                              |
| user-agent | User-Agent to send to the API server       | `GitHub Action +https://github.com/Flossiraptor/QueryOverpassAction` |

## Usage example

This example queries OSM to list hyperbaric chambers, and stores the result as
an artifact.

This example uses the `main` branch of the GitHub Action. You should use a
release tag or commit reference in your workflows.

```yaml
    steps:
      - uses: flossiraptor/QueryOverpassAction@main
        with:
          dest: ${{ github.workspace }}/chambers.xml
          query: '(nw["healthcare"="hyperbaric_chamber"];); out;'
          format: xml

      - uses: actions/upload-artifact@v7
        with:
          name: chambers.xml
          path: ${{ github.workspace }}/chambers.xml
          archive: false
```

## Releasing

Use rollup to create packaged releases under `/dist`.

```shell
rollup --config rollup.config.js
```
