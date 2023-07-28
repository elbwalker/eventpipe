import { BigQuery } from "@google-cloud/bigquery";
import type { DestinationBigQuery } from "./types";
import { createDatasetAndTable, existsDatasetAndTable } from "./setup";

export const destinationBigQuery: DestinationBigQuery.Function = {
  meta: {
    name: "BigQuery",
    version: "0.0.7",
  },

  config: {} as DestinationBigQuery.Config,

  async init(config) {
    const { custom } = config;
    if (!custom) error("Config custom missing");

    let { client, projectId, location, datasetId, tableId } = custom;
    if (!projectId) error("Config custom projectId missing");
    location = location || "EU";
    datasetId = datasetId || "eventpipe";
    tableId = tableId || "events";

    client =
      client ||
      new BigQuery({
        // @TODO credentials
        projectId,
      });

    this.config = {
      custom: {
        client,
        projectId,
        location,
        datasetId,
        tableId,
      },
    };

    return true;
  },

  async push(event, config, mapping = {}) {
    const { client, datasetId: dataset, tableId: table } = config.custom;
    await client
      .dataset(dataset)
      .table(table)
      .insert({ event: event.event, timestamp: String(Date.now()) });
  },

  async setup(config) {
    if (!(await this.init!(config))) error("Init error");

    // Load the updated config
    const { custom } = this.config;

    if (!(await existsDatasetAndTable(custom))) {
      await createDatasetAndTable(custom);
    }

    return true;
  },
};

function error(message: string): never {
  throw new Error(message);
}

export default destinationBigQuery;
