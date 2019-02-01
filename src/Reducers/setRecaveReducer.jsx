import { SETRECAVE } from '../Actions/Actions';

const setRecaveReducer = (state = "", { type, payload }) => {
  switch (type) {
    case SETRECAVE:
      return state = !state;
    default:
      return state;
  }
};

export default setRecaveReducer;