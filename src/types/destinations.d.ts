import { IElbwalker } from "@elbwalker/walker.js";
import { EventPipe } from "./eventpipe";

export namespace ServerDestination {
  interface Function<Custom = unknown, EventCustom = unknown> {
    init?: (config: Config<Custom, Partial<EventCustom>>) => Promise<boolean>;
    setup?: (config: Config<Custom, EventCustom>) => Promise<boolean>;
    push: (
      event: EventPipe.ServerEvent,
      config: Config<Custom, EventCustom>,
      mapping?: EventConfig<EventCustom>
    ) => Promise<void>;
    config: Config<Custom, EventCustom>;
    meta: Meta;
    queue?: Array<IElbwalker.Event>; // Non processed events yet and resettet with each new run
  }

  interface Config<Custom = unknown, EventCustom = unknown> {
    consent?: IElbwalker.Consent; // Required consent states to init and push events
    custom: Custom; // Arbitrary but protected configurations for custom enhancements
    init?: boolean; // If the destination has been initialized by calling the init method
    mapping?: Mapping<EventCustom>; // A map to handle events individually
  }

  interface Mapping<EventCustom> {
    [entity: string]: { [action: string]: EventConfig<EventCustom> };
  }

  interface Meta {
    name: string;
    version: string;
  }

  interface EventConfig<EventCustom = unknown> {
    consent?: IElbwalker.Consent; // Required consent states to init and push events
    custom?: EventCustom; // Arbitrary but protected configurations for custom event config
    ignore?: boolean; // Choose to no process an event when set to true
    name?: string; // Use a custom event name
  }

  type PushSuccess = Array<{
    id: string;
    destination: ServerDestination.Function;
  }>;
  type PushFailure = Array<{
    id: string;
    destination: ServerDestination.Function;
    error: unknown;
  }>;
}
