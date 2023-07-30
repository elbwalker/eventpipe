import type { DestinationBigQuery } from "./types";
import { schema } from "./schema";

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
    if (location) schema.location = location;

    await client.dataset(datasetId).createTable(tableId, schema);
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
