import { TOTALCHIPSET } from '../Actions/Actions';

const setTotalReducer = (state = "", { type, payload }) => {
  switch (type) {
    case TOTALCHIPSET:
      return state = payload.totalChipset;
    default:
      return state;
  }
};

export default setTotalReducer;
