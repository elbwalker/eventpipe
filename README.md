# walker.js EventPipe

> Early stage code examples to run your own first-party data collection.

EventPipe is an open-source software designed to simplify the deployment of data collection processes on various cloud providers. It provides a flexible framework to ingest and share events efficiently. The project aims to streamline the setup of data collection pipelines by offering a range of packages, providers, and destinations.

- **Modularity**: EventPipe follows a modular design, allowing for maintainability and scalability. Each component, from packages to destinations and stacks, can be independently developed and integrated.
- **Reusability**: Shared packages and types minimize code duplication and enable developers to build upon existing functionalities for data collection.
- **Customization**: Besides pre-built stacks and destinations, users can to customize their setups, making it ideal for various cloud providers and individual needs.
- **Easy Configuration**: Simple configuration of stacks by custom settings and including destinations for further processing.

> **Community Contributions**: As an open-source project, EventPipe welcomes contributions from the community, fostering a collaborative ecosystem of developers sharing their own stacks, destinations, and ideas.

## Packages

The `packages` directory contains reusable code snippets and utilities that can be utilized in different stacks of the EventPipe. These packages serve as building blocks to facilitate the development and integration of data collection functionalities within the framework.

## Stacks

The `stacks` directory houses predefined infrastructure setups and configurations. These stacks are build to be compatible with various cloud platforms such as GCP, Azure, AWS, and more. Choose a suitable provider stack that aligns with cloud infrastructure requirements.

## Destinations

The `destinations` directory hosts specific packages for event processing and forwarding, referred to as "destinations." Each destination is designed to send events to a specific data storage service like BigQuery, Snowflake, or others.

# Contributing

We encourage developers, data enthusiasts, and cloud experts to contribute to EventPipe. Whether you find a bug, have an idea for improvement, or want to create a new destination or stack, your contributions are valuable. Please feel free to create issues, provide feedback, start discussions, or contribute code. Let's work together to make EventPipe even more powerful and accessible for all analytics developers.

Deploying and maintaining data collection pipelines shall become an intuitive and flexible process, enabling first-party data collection with any cloud infrastructure.
