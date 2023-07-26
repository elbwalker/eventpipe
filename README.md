# walker.js EventPipe

> Early stage code examples to run your own first-party data collection.

Ingest -> Validate -> Enrich -> Share

EventPipe is an open-source software designed to simplify the deployment of data collection processes on various cloud providers. It provides a flexible framework to ingest and share events efficiently. The project aims to streamline the setup of data collection pipelines by offering a range of packages, providers, and destinations.

## Packages

The `packages` directory contains reusable code snippets and utilities that can be utilized in different stacks of the EventPipe. These packages serve as building blocks to facilitate the development and integration of data collection functionalities within the framework.

## Providers

Hoster of the infrastructure
The `stacks` directory houses predefined infrastructure setups and configurations. These stacks are build to be compatible with various cloud platforms such as GCP, Azure, AWS, and more. Choose a suitable provider stack that aligns with cloud infrastructure requirements.

## Destinations

The `destinations` directory hosts specific packages for event processing and forwarding, referred to as "destinations." Each destination is designed to send events to a specific data storage service like BigQuery, Snowflake, or others.
