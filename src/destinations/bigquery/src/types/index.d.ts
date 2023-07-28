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

  interface Event {
    event: string;
    data?: Walker.Properties;
    context?: Walker.OrderedProperties;
    globals?: Walker.Properties;
    user?: IElbwalker.User;
    nested?: Walker.Entities;
    consent: IElbwalker.Consent;
    id: string;
    trigger?: string;
    entity: string;
    action: string;
    timestamp: Date;
    timing?: number;
    group?: string;
    count?: number;
    version?: {
      eventpipe?: string;
      config?: string;
    };
    source?: {
      type?: string;
      id?: string;
      previous_id?: string;
    };
    server_timestamp: Date;
    additional_data?: Walker.Properties;
  }
}
