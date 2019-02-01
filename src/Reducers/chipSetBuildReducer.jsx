import { SELECTMINCHIP, SELECTSTARTINGSTACK  } from '../Actions/Actions';

const chipSetBuildReducer = (state = "", {type, payload}) => {
  switch (type) {
    case SELECTMINCHIP:
      return {...state.settings, minChip : payload.minChip, startingStack: payload.minChip * 400 };
    case SELECTSTARTINGSTACK:
      return {...state.settings, startingStack: payload.startingStack, minChip : payload.minChip };
    default:
      return state;
  }
};

export default chipSetBuildReducer;