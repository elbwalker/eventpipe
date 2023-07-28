import type { DestinationBigQuery } from "./types";

describe("Destination BigQuery", () => {
  let destination: DestinationBigQuery.Function,
    config: DestinationBigQuery.Config;

  const mockFn = jest.fn(); //.mockImplementation(console.log);

  const event = "entity action";
  const projectId = "pr0j3ct1d";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    destination = require(".").default;
  });

  test("init", () => {
    config = {
      custom: { projectId },
    };

    expect(destination.init).toBeDefined();
    if (!destination.init) return;

    destination.init(config);
    expect(true).toBeTruthy();
  });

  test("push", () => {
    // expect(mockFn).toHaveBeenNthCalledWith(1, event);
  });
});
