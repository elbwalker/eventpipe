import { log } from "@eventpipe/packages";
import { DestinationXXX } from "./types";
export * from "./types/index.d";

export const BigQuery: DestinationXXX.Function = {
  config: {},

  init(config) {
    log("moin");

    // Do something initializing

    return true;
  },

  push(event, config, mapping = {}) {
    // Do something magical
  },
};

export default BigQuery;
