import type { ServerDestination } from "@eventpipe/types";
import type { BigQuery } from "@google-cloud/bigquery";

export declare namespace DestinationBigQuery {
  interface Function
    extends ServerDestination.Function<CustomConfig, CustomEventConfig> {}

  type Config = ServerDestination.Config<CustomConfig, CustomEventConfig>;
  type PartialConfig = ServerDestination.Config<Partial<CustomConfig>, Partial<CustomEventConfig>>;

  interface CustomConfig {
    client: BigQuery;
    projectId: string;
    datasetId: string;
    tableId: string;
    location?: string;
  }

  interface CustomEventConfig {
    // Custom destination event mapping properties
  }
}
