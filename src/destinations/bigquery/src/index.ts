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
    const { client, datasetId, tableId } = this.config.custom;

    // @TODO update type and make this more beautiful
    const destinationEvent = {
      ...event,
      data: JSON.stringify(event.data),
      context: JSON.stringify(event.context),
      globals: JSON.stringify(event.globals),
      nested: JSON.stringify(event.nested),
      consent: JSON.stringify(event.consent),

      timestamp: new Date(event.timestamp),
      server_timestamp: new Date(),
    };
    delete (destinationEvent as any).request;

    try {
      await client.dataset(datasetId).table(tableId).insert(destinationEvent);
    } catch (e) {
      log(e as string); // @TODO not good
      error("Error inserting event");
    }
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
  },
};

function error(message: string): never {
  throw new Error(message);
}

function log(message: string): void {
  console.log(message);
}

export default destinationBigQuery;
