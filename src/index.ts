import type { EventPipe, ServerDestination } from "./types";

function eventPipe(config: Partial<EventPipe.Config>): EventPipe.Function {
  const destinations: EventPipe.Destinations = {};

  const addDestination: EventPipe.AddDestination = (id, destination) => {
    destinations[id] = destination;
  };

  const push: EventPipe.Push = async (event) => {
    const { successful, failed } = await pushToDestinations(
      destinations,
      event
    );

    return { successful, failed };
  };

  // @TODO validate

  // @TODO enrich

  const instance: EventPipe.Function = {
    addDestination,
    push,
    destinations,
    config: getConfig(config),
  };

  return instance;
}

function getConfig(config: Partial<EventPipe.Config>): EventPipe.Config {
  return {
    version: config.version || "0.0.0",
  };
}

async function pushToDestinations(
  destinations: EventPipe.Destinations,
  event: EventPipe.ServerEvent
): Promise<{
  successful: ServerDestination.PushSuccess;
  failed: ServerDestination.PushFailure;
}> {
  const results: {
    id: string;
    destination: ServerDestination.Function;
    done: boolean;
    error?: unknown;
  }[] = await Promise.all(
    Object.entries(destinations).map(async ([id, destination]) => {
      try {
        await destination.push(event, destination.config);
        return { id, destination, done: true };
      } catch (error) {
        return { id, destination, done: false, error };
      }
    })
  );

  const successful: ServerDestination.PushSuccess = [];
  const failed: ServerDestination.PushFailure = [];

  for (const result of results) {
    if (result.done) {
      successful.push({ id: result.id, destination: result.destination });
    } else {
      failed.push({
        id: result.id,
        destination: result.destination,
        error: result.error,
      });
    }
  }

  return { successful, failed };
}

export default eventPipe;
