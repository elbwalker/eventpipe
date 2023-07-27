import type { BigQuery, TableField } from "@google-cloud/bigquery";
import type { DestinationBigQuery } from "./types";

export const createDatasetAndTable = async function (
  custom: DestinationBigQuery.CustomConfig
) {
  const { client, datasetId: dataset, location, tableId: table } = custom;

  try {
    await client.createDataset(dataset, { location: "EU" });
  } catch (e) {
    if (!(e as Error).message.includes("Already Exists")) {
      throw e;
    }
  }

  try {
    const options = {
      schema: tableSchema,
      location: location || "EU",
    };
    await client.dataset(dataset).createTable(table, options);
  } catch (e) {
    if (!(e as Error).message.includes("Already Exists")) {
      throw e;
    }
  }
};

export const existsDatasetAndTable = async function (
  client: BigQuery,
  datasetId: string,
  tableId: string
): Promise<boolean> {
  const dataset = client.dataset(datasetId);

  try {
    await dataset.exists();
    await dataset.table(tableId).get();
    return true;
  } catch (e) {
    return false;
  }
};

const tableSchema: TableField[] = [
  {
    name: "event",
    type: "STRING",
    description: "Event name",
  },
  {
    name: "timestamp",
    type: "STRING",
    description: "Time stamp at the beginning of a session",
  },
];
