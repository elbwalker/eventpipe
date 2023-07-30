import type { IElbwalker, Walker } from "@elbwalker/walker.js";
import type { ServerDestination } from "@eventpipe/types";
import type { BigQuery, BigQueryOptions } from "@google-cloud/bigquery";

export declare namespace DestinationBigQuery {
  interface Function
    extends ServerDestination.Function<CustomConfig, CustomEventConfig> {
    // @TODO init as static method
  }

  type Config = ServerDestination.Config<CustomConfig, CustomEventConfig>;
  type PartialConfig = ServerDestination.Config<
    Partial<CustomConfig>,
    Partial<CustomEventConfig>
  >;

  interface CustomConfig {
    client: BigQuery;
    projectId: string;
    datasetId: string;
    tableId: string;
    location?: string;
    bigquery?: BigQueryOptions;
  }

  interface CustomEventConfig {
    // Custom destination event mapping properties
  }

  interface Row {
    event: string;
    data?: string;
    context?: string;
    globals?: string;
    user?: IElbwalker.User;
    nested?: string;
    consent: string;
    id: string;
    trigger?: string;
    entity: string;
    action: string;
    timestamp: Date;
    timing?: number;
    group?: string;
    count?: number;
    version?: {
      client?: string;
      server?: string;
    };
    source?: {
      type?: string;
      id?: string;
      previous_id?: string;
    };
    server_timestamp: Date;
    additional_data?: string;
  }
}
