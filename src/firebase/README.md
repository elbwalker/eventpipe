# Firebase Functions
This sections describes how to setup the Elbwalker event pipeline with [Cloud Functions for Firebase](https://firebase.google.com/docs/functions).


## Setup
All commands are meant to be run from this folder (`src/firebase/`).


1. Create a Firebase Project
See https://firebase.google.com/docs/functions/get-started?gen=2nd#create-a-firebase-project


2. Activate Billing
Activate billing for you Firebase Project (e.g. Pay as you go - Blaze plan).
See https://firebase.google.com/pricing


3. Set up your environment and the Firebase CLI
Follow the instructions on https://firebase.google.com/docs/functions/get-started?gen=2nd#set-up-your-environment-and-the-firebase-cli for Node.js

If you are using Node Version Manager, run:
```
nvm install 18
nvm use 18
npm install -g firebase-tools
npm install firebase-functions@latest firebase-admin@latest --save
npm install @google-cloud/bigquery
```


4. Initialize your project
Firt run `firebase login` to log in via the browser and authenticate the Firebase CLI.

Then run initialise function by running `firebase init functions`. Select the project you created and `TypeScript` as the language, opt-in for `ESLint` and install dependencies with npm!

See https://firebase.google.com/docs/functions/get-started?gen=2nd#initialize-your-project for more information.


5. Run locally
To build and run the code locally, just run:
```
npm run serve
``` 

In the console you will find the enpoint URL, e.g. `http://127.0.0.1:5001/syte-elbwalker-test/europe-west1/handleEvent`. You can then send an event to your local API with:
```
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://127.0.0.1:5001/syte-elbwalker-test/europe-west1/handleEvent
```
You will see some logoutput in your terminal