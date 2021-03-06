# Captioner.app

<div align="center">
  <a href="https://captioner.app">
    <img
    max-width="600px"
    alt="Captioner screenshot showing a user adding subtitles to the Godfather movie."
     src="https://raw.githubusercontent.com/bmcmahen/captioner/master/captioner.jpg">
  </a>
</div>
<br />

Captioner.app is a web app that allows you to produce SRT files for mp4, YouTube, or Vimeo videos directly in your web browser.

It's built using the [Sancho-UI](https://github.com/bmcmahen/sancho) design system, Firebase, Typescript, React and Emotion.

[Try it out here](https://subtitles-c6d76.firebaseapp.com/).

## Running locally

This project is built using `create-react-app`, typescript, and firebase. To get it running properly, you'll need to create your own firebase application and export your firebase configuration in a file at `src/firebase-config.ts`. The config should look something like this:

```js
// src/firebase-config.ts
const config = {
  apiKey: "myapikey",
  authDomain: "my-auth-domain.firebaseapp.com",
  databaseURL: "my-db-url.com",
  projectId: "my-pid",
  storageBucket: "my-storage-bucket",
  messagingSenderId: "my-sender-id"
};

export default config;
```

You'll also need to install the local dependencies using Yarn or NPM.

```
yarn
```

Finally, run:

```
yarn start
```

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deploying

Use firebase-cli to initalize a project in the root directory. Then build your project and deploy.

```
yarn run build
firebase deploy
```

## License

BSD 3-Clause, see the LICENSE file.
