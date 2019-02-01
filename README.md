This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Welcome to PokerBlinders !

The PokerBlinders is a application for create a virtual case. In order to calculate the number of chips needed for our tournament. The application also allows to know the average price of the various chips.

### Requirements
* ES6
* React
* HTML
* CSS 3
* Redux
* Bootstrap
* Reactstrap

## Updating to New Releases

Create React App is divided into two packages:

-   `create-react-app PokerBlinders`  is a global command-line utility that you use to create new projects.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Folder Structure
```
nantes-0918-javascript-pokerBlinders/
  README.md
  package.json
    public/
      index.html
    src/
      Actions/
        Actions.jsx
      components/
        Chipcase/
          Chipcase.css
          Chipcase.jsx
        ChipsetComponent/
          ChipsetComponent.css
          ChipsetComponent.jsx
        ColorPicker/
          ColorPicker.css
          ColorPicker.jsx
        Navigation/
          Navigation.css
          Navigation.jsx
        Parameters/
          Parameters.css
          Parameters.jsx
      Reducers/
        changeColorDataReducer.jsx
        chipSetBuildReducer.jsx
        chipsetGenerationReducer.jsx
        enableTouchReducer.jsx
        extraRulesReducer.jsx
        generateStacksReducer.jsx
        maxPlayerReducer.jsx
        setRecaveReducer.jsx
        setRecaveReducer.jsx
      Utils/
        Utils.js
      App.css
      App.jsx
      index.css
      index.jsx

```
## Team 

LAUGER Geoffroy (https://github.com/geoffroy72)
DURAN Maeva (https://github.com/mae-va)
NOURRIS Antoine (https://github.com/awcs)
TOUJA Marion (https://github.com/mtouja)