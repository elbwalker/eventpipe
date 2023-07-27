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
    const { datasetId, projectId } = custom;

    if (!datasetId) error("Config custom datasetId missing");
    if (!projectId) error("Config custom projectId missing");

    custom.client =
      custom.client ||
      new BigQuery({
        // @TODO credentials
        projectId,
      });

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
    const { custom } = config;
    const { datasetId, projectId } = custom;

    if (!(await existsDatasetAndTable(custom.client, datasetId, projectId)))
      await createDatasetAndTable(config.custom);

    return true;
  },
};

function error(message: string): never {
  throw new Error(message);
}

export default destinationBigQuery;
