import type { BigQueryOptions } from "@google-cloud/bigquery";
import type { DestinationBigQuery } from "./types";
import { BigQuery } from "@google-cloud/bigquery";
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
    const custom = config ? config.custom : this.config.custom;
    const { client, datasetId, tableId } = custom || custom;

    // Required properties
    const destinationEvent: DestinationBigQuery.Row = {
      event: event.event,
      consent: JSON.stringify(event.consent),
      id: event.id,
      entity: event.entity,
      action: event.action,
      timestamp: new Date(event.timestamp),
      server_timestamp: new Date(),
    };

    // Optional properties
    if (event.data) destinationEvent.data = JSON.stringify(event.data);
    if (event.context) destinationEvent.context = JSON.stringify(event.context);
    if (event.globals) destinationEvent.globals = JSON.stringify(event.globals);
    if (event.user) destinationEvent.user = event.user;
    if (event.nested) destinationEvent.nested = JSON.stringify(event.nested);
    if (event.trigger) destinationEvent.trigger = event.trigger;
    if (event.timing) destinationEvent.timing = event.timing;
    if (event.group) destinationEvent.group = event.group;
    if (event.count) destinationEvent.count = event.count;
    if (event.version) destinationEvent.version = event.version;
    if (event.source) destinationEvent.source = event.source;
    if (event.additional_data)
      destinationEvent.additional_data = JSON.stringify(event.additional_data);

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
  console.dir(message, { depth: 4 });
}

export default destinationBigQuery;
