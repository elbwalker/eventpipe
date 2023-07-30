import type { EventPipe } from "@eventpipe/types";
import type { DestinationBigQuery } from "./types";
import { readFileSync } from "fs";
import { join } from "path";

describe("Destination BigQuery", () => {
  const mockFn = jest.fn(); //.mockImplementation(console.log);

  const projectId = "eventpipe-f9979"; //@TODO change to pr0j3ct1d
  const location = "EU";
  const datasetId = "d4t4s3t1d";
  const tableId = "t4bl31d";

  let destination: DestinationBigQuery.Function,
    config: DestinationBigQuery.PartialConfig;

  // @TODO find another solution
  let credentials: any; // @TODO
  try {
    credentials = JSON.parse(
      readFileSync(join(__dirname, "service_account.json"), "utf-8")
    );
  } catch (error) {}

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    destination = require(".").default;
    config = {
      custom: {
        projectId,
        location,
        datasetId,
        tableId,
      },
    };
  });

  test("setup", async () => {
    expect(destination.setup).toBeDefined();
    if (!destination.setup) return;

    await expect(destination.setup({} as any)).rejects.toThrowError();

    config.custom = { projectId, bigquery: { credentials } };
    expect(await destination.setup(config)).toBeTruthy();
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
    const event: EventPipe.ServerEvent = {
      event: "entity action",
      data: { foo: "bar" },
      context: { dev: ["test", 1] },
      globals: { lang: "ts" },
      user: { id: "us3r", device: "c00k13", session: "s3ss10n" },
      nested: [
        {
          type: "child",
          data: { type: "nested" },
          nested: [],
          context: { element: ["child", 0] },
        },
      ],
      consent: { debugging: true },
      id: "1-gr0up-1",
      trigger: "test",
      entity: "entity",
      action: "action",
      timestamp: 1690561989523,
      timing: 3.14,
      group: "gr0up",
      count: 1,
      version: {
        client: "0.0.7",
        server: "1.2.4",
      },
      source: {
        type: "jest",
        id: "https://localhost:80",
        previous_id: "http://remotehost:9001",
      },
      additional_data: {
        useragent: "jest",
      },
    };

    config.custom = { projectId, bigquery: { credentials } };
    await destination.init!(config);

    await destination.push(event);
  });
});
