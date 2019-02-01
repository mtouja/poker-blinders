import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import chipSetBuildReducer from './Reducers/chipSetBuildReducer';
import chipsetGenerationReducer from './Reducers/chipsetGenerationReducer';
import generateStacksReducer from './Reducers/generateStacksReducer';
import maxPlayerReducer from './Reducers/maxPlayerReducer';
import enableTouchReducer from './Reducers/enableTouchReducer';
import setTotalReducer from './Reducers/setTotalReducer';
import extraRulesReducer from './Reducers/extraRulesReducer';
import setRecaveReducer from './Reducers/setRecaveReducer';
import changeColorDataReducer from './Reducers/changeColorDataReducer';

const allReducers = combineReducers({
  settings: chipSetBuildReducer,
  possibleStack: generateStacksReducer,
  chipset: chipsetGenerationReducer,
  maxPlayers: maxPlayerReducer,
  enabletouch: enableTouchReducer,
  totalChipset: setTotalReducer,
  extraRules: extraRulesReducer,
  recave: setRecaveReducer,
  colorData: changeColorDataReducer
});

const store = createStore(allReducers, {
  settings: {
    minChip: 25,
    startingStack: 10000,
  },
  possibleStack: [],
  enabletouch: true,
  chipset: {
    chipOne: 0,
    chipTwo: 0,
    chipThree: 0,
    chipFour: 0,
    chipFive: 0,
    nbrChipOne: 0,
    nbrChipTwo: 0,
    nbrChipThree: 0,
    nbrChipFour: 0,
    nbrChipFive: 0,
  },
  extraRules: {
    addonsChips: 0,
    maxAddons: 0,
    maxRebuys: 0,
  },
  maxPlayers: 18,
  totalChipset: 0,
  recave: false,
  colorData: true
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));