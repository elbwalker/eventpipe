/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import {
  ElbwalkerTableRow,
  createBigQueryTable,
  insertEventIntoBigQuery,
  isMissingTableError,
} from "./bigquery";

export const handleEvent = functions
  .region("europe-west3")
  .https.onRequest(async (request, response) => {
    try {
      logger.debug("An Elbwalker event is received and being processed now", {
        body: request.body,
      });

      /**
       * TODO: Parse request and create event to be inserted into database!
       */
      const event: ElbwalkerTableRow = {
        id: "SOME ID",
        timestamp: "SOME TIMESTAMP",
        body: JSON.stringify(request.body),
        headers: JSON.stringify(request.headers),
      };

      await insertEventIntoBigQuery(event);
      response.json({ status: "ok", message: "Event processed" });
    } catch (e) {
      if (isMissingTableError(e)) {
        const message =
          "BigQuery table not existing yet, creating it now. Try again later!";
        logger.warn(message);
        await createBigQueryTable();
        response.status(500).json({ status: "error", message });
      } else {
        const message =
          "An unexpected error happened processing an incoming request";
        logger.error(message, e);
        response.status(500).json({ status: "error", message });
      }
    }
  });
