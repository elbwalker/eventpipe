/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';
import * as logger from 'firebase-functions/logger';

import eventPipe from '@eventpipe/index';
// @TODO build the destination and import default from dist folder
import { destinationBigQuery } from '@destinations/bigquery/src';
import { EventPipe } from '@eventpipe/types';

export const handleEvent = functions
  .region('europe-west3') // @TODO make it configurable
  .https.onRequest(async (request, response) => {
    try {
      const pipe = eventPipe({
        version: '0.0.1',
      });

      pipe.addDestination('bigquery', destinationBigQuery);

      const event: EventPipe.ServerEvent = request.body;
      event.additional_data = {
        useragent: request.headers['user-agent'] || 'unknown',
      };

      const { successful, failed } = await pipe.push(event);
      logger.debug('Push results', {
        successful,
        failed,
      });

      const status = failed.length
        ? { code: 500, type: 'error' }
        : { code: 200, type: 'success' };

      response
        .status(status.code)
        .json({ status: status.type, successful, failed });
    } catch (error) {
      const message = 'Unexpected error';
      logger.error(message, error);
      response.status(500).json({ status: 'broken', message, e: error });
    }
  });
