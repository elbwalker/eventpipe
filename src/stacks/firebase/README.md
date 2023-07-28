# Firebase Functions

This sections describes how to setup the Elbwalker event pipeline with [Cloud Functions for Firebase](https://firebase.google.com/docs/functions).

## Setup

### 1. Create a Firebase Project

See https://firebase.google.com/docs/functions/get-started?gen=2nd#create-a-firebase-project

### 2. Activate Billing

Activate billing for you Firebase Project (e.g. Pay as you go - Blaze plan).
See https://firebase.google.com/pricing

### 3. Set up your environment and the Firebase CLI

Assuming you have `nvm` (Node Version Manager) installed, run:

```
nvm install 18
nvm use 18
npm install -g firebase-tools
```

For details see the instructions on https://firebase.google.com/docs/functions/get-started?gen=2nd#set-up-your-environment-and-the-firebase-cli for Node.js

### 4. Initialize your project

Firt run `firebase login` to log in via the browser and authenticate the Firebase CLI.

Install project dependencies by running the following commands from the `src/firebase/functions` folder:

```
npm install
```

### 5. Run locally

Set the firebase project you want to work with

```
firebase use YOU_PROJECT_ID
```

To build and run the code locally, just run from the `src/firebase/functions` folder:

```
npm run serve
```

In the console you will find the enpoint URL, e.g. `http://127.0.0.1:5001/YOUR_PROJECT_ID/YOUR_REGION/handleEvent`. You can then send an event to your local API with:

```
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5001/YOUR_PROJECT_ID/YOUR_REGION/handleEvent
```

You will see some logoutput in your terminal

### 6. Deployment

To deploy the app, run the following command from the `src/firebase` folder:

```
firebase deploy --only functions
```

You will find the `Function URL` in the terminal output and you can issue a Request against it as described above.
