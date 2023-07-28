import type { DestinationBigQuery } from "./types";

describe("Destination BigQuery", () => {
  let destination: DestinationBigQuery.Function,
    config: DestinationBigQuery.PartialConfig;

  const mockFn = jest.fn(); //.mockImplementation(console.log);

  const projectId = "pr0j3ct1d";
  const datasetId = "d4t4s3t1d";
  const tableId = "t4bl31d";

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    destination = require(".").default;
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

    await expect(
      destination.init({ custom: { projectId, tableId } } as any)
    ).rejects.toThrow("Config custom datasetId missing");

    await expect(
      destination.init({ custom: { projectId, datasetId } } as any)
    ).rejects.toThrow("Config custom tableId missing");
  });

  test("push", async () => {
    // expect(mockFn).toHaveBeenNthCalledWith(1, event);
  });
});
