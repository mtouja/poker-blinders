import { SETEXTRARULES } from '../Actions/Actions';

const extraRulesReducer = (state = "", { type, payload }) => {
  switch (type) {
    case SETEXTRARULES:
      return {...state, maxAddons: payload.maxAddons, addonsChips: payload.addonsChips, maxRebuys: payload.maxRebuys };
    default:
      return state;
  }
};

export default extraRulesReducer;