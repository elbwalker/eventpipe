# BigQuery server destination for walker.js eventpipe

Made to be used with [@elbwalker/walker.js](https://github.com/elbwalker/walker.js) and [@elbwalker/eventpipe](https://github.com/elbwalker/eventpipe).

More detailed information and examples can be found in the [documentation](https://docs.elbwalker.com/).

## 🤓 Usage

tbd

### Configuration

```ts
interface CustomConfig {
  client: BigQuery;
  projectId: string;
  datasetId: string;
  tableId: string;
  location?: string;
  bigquery?: BigQueryOptions;
}
```

For further details on the `bigquery` option (especially authentication) see [Interface BigQueryOptions](https://cloud.google.com/nodejs/docs/reference/bigquery/latest/bigquery/bigqueryoptions)

#### Example authentication with credentials

Create a [service account](https://cloud.google.com/iam/docs/service-account-overview) with BigQuery permissions and download the keyfile

```js
{
  custom: {
    bigquery: {
      credentials: {
        private_key: '"-----BEGIN PRIVATE KEY-----\nMIIEv...';
        client_email: "bigquery@PROJECT_ID.iam...";
      }
    }
  }
}
```

## Setup

@TODO how to trigger the setup method? This should be done manually

## Contribute

Feel free to contribute by submitting an [issue](https://github.com/elbwalker/eventpipe/issues), starting a [discussion](https://github.com/elbwalker/eventpipe/discussions) or getting in [contact](https://calendly.com/elb-alexander/30min).
