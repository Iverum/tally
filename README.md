# Tally

> An desktop application for tagging and searching media built with Electron & React.

Tally is my attempt to satisfy my categorical desires without having to rely on third-party solutions that either store data in the cloud or utilize awkward tagging constructions that modify files.

### Getting started
```bash
git clone git@github.com:Iverum/tally.git
cd tally
npm i
npm start
```

### Some notes on structure
I am aware my structural preferences deviate from the norm for React apps. As I am the only person currently working on this project, I don't really mind. However, in the off chance that you may want to contribute I want to try to explain some of the structural choices I am making.

_All of this is in flux and the documentation I provide may be out of date._

### `/src`
Fairly explainatory for the most part. `/src` is the root of the project. `index.js` handles initializing the Electron app while `app.jsx` provides the entry point into the React elements. `store.js` handles initializing the Redux store and combining reducers. `constants.js` contains top-level constants that I expect to use throughout the app.

Normally you would find some directories here like `/reducers` or `/actions` or `/components`. I am not a fan of breaking my discrete units of functionality into far flung directories based on what kind of thing they do independently. Instead I group my code into `/modules`.

I will also include other high level directories here for code that needs shared across the application. You'll find my `/database` here and also any shared `/components`.

### `/modules`
Modules are intended to be discrete units of functionality. The size of this functionality is flexible, but at the moment they could best be thought of as individual screens. They may grow or shrink, but they should always be as discrete as possible. Importing `/modules/<module>/index.jsx` should provide a component that you can drop anywhere and expect it to behave.

As such, modules generally export a single React component.

### `/modules/*`
A typical module will have an `index.jsx` that exports the main React component that composes most of the functionality. This should typically be the only import anything external to the module needs (outside of the Redux store needing the reducer in `dux.js`).

Most modules will also have a `dux.js` that is based on [a modular Redux pattern](https://github.com/erikras/ducks-modular-redux). This file will export a reducer as the default and possibly exports action creators or action types. The action creators you find inside the `dux.js` file will be very simple and avoid any asynchronous behavior.

`actions.js` is where you will find the asynchronous or complicated behavior the component may need to encapsulate. It will typically import action creators from `dux.js`.

A module might also have `constants.js`(self explainatory).
