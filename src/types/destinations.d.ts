import { IElbwalker } from "@elbwalker/walker.js";

export namespace ServerDestination {
  interface Function<Custom = unknown, EventCustom = unknown> {
    init?: (
      config: Config<Partial<Custom>, Partial<EventCustom>>
    ) => Promise<boolean>;
    setup?: (config: Config<Custom, EventCustom>) => Promise<boolean>;
    push: (
      event: IElbwalker.Event,
      config: Config<Custom, EventCustom>,
      mapping?: EventConfig<EventCustom>
    ) => Promise<void>;
    config: Config<Custom, EventCustom>;
    queue?: Array<IElbwalker.Event>; // Non processed events yet and resettet with each new run
  }

  interface Config<Custom = unknown, EventCustom = unknown> {
    consent?: IElbwalker.Consent; // Required consent states to init and push events
    custom: Custom; // Arbitrary but protected configurations for custom enhancements
    init?: boolean; // If the destination has been initialized by calling the init method
    allowSetup?: boolean; // If the destination is allowed to eventually run the setup routine
    mapping?: Mapping<EventCustom>; // A map to handle events individually
  }

  interface Mapping<EventCustom> {
    [entity: string]: { [action: string]: EventConfig<EventCustom> };
  }

  interface EventConfig<EventCustom = unknown> {
    consent?: IElbwalker.Consent; // Required consent states to init and push events
    custom?: EventCustom; // Arbitrary but protected configurations for custom event config
    ignore?: boolean; // Choose to no process an event when set to true
    name?: string; // Use a custom event name
  }
}
