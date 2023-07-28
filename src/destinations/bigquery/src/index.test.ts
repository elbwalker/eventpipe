import type { DestinationBigQuery } from "./types";

describe("Destination BigQuery", () => {
  const mockFn = jest.fn(); //.mockImplementation(console.log);

  const projectId = "pr0j3ct1d";
  const datasetId = "d4t4s3t1d";
  const tableId = "t4bl31d";

  let destination: DestinationBigQuery.Function,
    config: DestinationBigQuery.PartialConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    destination = require(".").default;
    config = {
      custom: {
        projectId,
        datasetId,
        tableId,
      },
    };
  });

  test.skip("setup", async () => {
    expect(destination.setup).toBeDefined();
    if (!destination.setup) return;

    await expect(destination.setup({} as any)).rejects.toThrowError();

    await destination.setup({ custom: { projectId: "eventpipe-f9979" } });
  });

  test("init", async () => {
    config = {
      custom: { projectId, datasetId, tableId },
    };

    expect(destination.init).toBeDefined();
    if (!destination.init) return;

    await expect(destination.init({} as any)).rejects.toThrow(
      "Config custom missing"
    );

    await expect(
      destination.init({ custom: { datasetId, tableId } } as any)
    ).rejects.toThrow("Config custom projectId missing");

    await destination.init({ custom: { projectId } } as any);

    expect(destination.config.custom.datasetId).toBe("eventpipe");
    expect(destination.config.custom.tableId).toBe("events");
  });

  test("push", async () => {
    // expect(mockFn).toHaveBeenNthCalledWith(1, event);
  });
});
