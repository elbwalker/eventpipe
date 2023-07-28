import { BigQuery } from "@google-cloud/bigquery";
import type { BigQueryOptions } from "@google-cloud/bigquery";
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

    let { client, projectId, location, datasetId, tableId, bigquery } = custom;
    if (!projectId) error("Config custom projectId missing");
    location = location || "EU";
    datasetId = datasetId || "eventpipe";
    tableId = tableId || "events";

    const options: BigQueryOptions = bigquery || {};
    if (projectId) options.projectId = projectId;

    client = client || new BigQuery(options);

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

    if (await existsDatasetAndTable(custom)) {
      log("Dataset and table already exists");
      return true;
    } else {
      log("Creating dataset and/or table");
      await createDatasetAndTable(custom);
      log("Dataset and table created");
      return true;
    }

    return true;
  },
};

function error(message: string): never {
  throw new Error(message);
}

function log(message: string): void {
  console.log(message);
}

export default destinationBigQuery;
