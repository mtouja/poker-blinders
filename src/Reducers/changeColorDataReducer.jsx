import { DATACOLORMINCHIP, DATACOLORPICKER  } from '../Actions/Actions';

const changeColorDataReducer = (state = "", { type, payload }) => {
  switch (type) {
    case DATACOLORMINCHIP:
      return state = true;
    case DATACOLORPICKER:
      return state = false;
    default:
      return state;
  }
};

export default changeColorDataReducer;