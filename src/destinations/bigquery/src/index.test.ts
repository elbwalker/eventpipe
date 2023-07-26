import { DestinationXXX } from "./types";

describe("Destination BigQuery", () => {
  let destination: DestinationXXX.Function, config: DestinationXXX.Config;

  const mockFn = jest.fn(); //.mockImplementation(console.log);

  const event = "entity action";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    destination = require(".").default;
  });

  test("init", () => {
    config = {
      custom: {},
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
