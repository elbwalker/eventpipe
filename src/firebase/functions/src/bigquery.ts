import * as logger from "firebase-functions/logger";
import { BigQuery, TableField } from "@google-cloud/bigquery";

const bigquery = new BigQuery();

// NOTE: Harcoded dataset and table for now. We could make it configurable through env vars in the futures.
const datasetId = "elbwalker";
const tableId = "events";

// TODO: Complete table schema!
const elbwalkerTableSchema: TableField[] = [
  {
    name: "id",
    type: "STRING",
    description: "Random ID to identify a session",
  },
  {
    name: "timestamp",
    type: "STRING",
    description: "Time stamp at the beginning of a session",
  },
  {
    name: "body",
    type: "STRING",
    description: "The raw request body as a string",
  },
  {
    name: "headers",
    type: "STRING",
    description: "The raw request body as a string",
  },
];

// TODO: Keep interface in sync with elbwalkerTableSchema
export interface ElbwalkerTableRow {
  id: string;
  timestamp: string;
  body: string;
  headers: string;
}

/**
 * Checks if an error thrown from the BigQuery SDK indicates that either the dataset or
 * the table is not existing yet.
 *
 * @param bigqueryError error thrown from the BigQuery SDK
 * @return true if the table or dataset is missing, false otherwise
 */
export const isMissingTableError = function (bigqueryError: unknown): boolean {
  if (
    typeof bigqueryError !== "object" ||
    bigqueryError === null ||
    !("errors" in bigqueryError)
  ) {
    return false;
  }

  const errorrs = Array.isArray(bigqueryError.errors)
    ? (bigqueryError.errors as Array<unknown>)
    : [];
  const projectId = process.env.GCLOUD_PROJECT;
  const expectedDatasetError = `Not found: Dataset ${projectId}:${datasetId}`;
  const expectedTableError = `Not found: Table ${projectId}:${datasetId}.${tableId}`;

  return errorrs.some((error) => {
    if (typeof error !== "object" || error === null || !("message" in error)) {
      return false;
    }
    return (
      error.message == expectedDatasetError ||
      error.message == expectedTableError
    );
  });
};

export const createBigQueryTable = async function () {
  try {
    await bigquery.createDataset(datasetId, { location: "EU" });
    logger.debug("Created BigQuery dataset", { datasetId });
  } catch (e) {
    if (!(e as Error).message.includes("Already Exists")) {
      throw e;
    }
  }

  const options = {
    schema: elbwalkerTableSchema,
    location: "EU",
  };

  try {
    await bigquery.dataset(datasetId).createTable(tableId, options);
    logger.debug("Created BigQuery table", { tableId });
  } catch (e) {
    if (!(e as Error).message.includes("Already Exists")) {
      throw e;
    }
  }
};

/**
 * Inserts an event into BigQuery
 *
 * @param event the request body of the incoming API request representing the event
 * @return undefined
 */
export const insertEventIntoBigQuery = async function (
  event: ElbwalkerTableRow
) {
  logger.debug("Inserting row into BigQuery table...", { datasetId, tableId });
  await bigquery.dataset(datasetId).table(tableId).insert(event);
  logger.debug("Inserted row into BigQuery successfully");
};
