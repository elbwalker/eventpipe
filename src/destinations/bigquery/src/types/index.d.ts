import { WebDestination } from "@elbwalker/walker.js";

export declare namespace DestinationXXX {
  interface Function
    extends WebDestination.Function<CustomConfig, CustomEventConfig> {}

  type Config = WebDestination.Config<CustomConfig, CustomEventConfig>;

  interface CustomConfig {
    // XXXs custom settings
  }

  interface CustomEventConfig {
    // Custom destination event mapping properties
  }
}
