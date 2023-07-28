import type { BigQuery, TableField } from "@google-cloud/bigquery";
import type { DestinationBigQuery } from "./types";

export const createDatasetAndTable = async function (
  custom: DestinationBigQuery.CustomConfig
) {
  const { client, datasetId, location, tableId } = custom;

  try {
    await client.createDataset(datasetId, { location });
  } catch (e) {
    if (!(e as Error).message.includes("Already Exists")) {
      throw e;
    }
  }

  try {
    const options = {
      schema: tableSchema,
      location,
    };
    await client.dataset(datasetId).createTable(tableId, options);
  } catch (e) {
    if (!(e as Error).message.includes("Already Exists")) {
      throw e;
    }
  }

  return true;
};

export const existsDatasetAndTable = async function (
  custom: DestinationBigQuery.CustomConfig
): Promise<boolean> {
  const { client, datasetId, tableId } = custom;

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
