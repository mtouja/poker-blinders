import { ENABLETOUCH } from '../Actions/Actions';

const enableTouchReducer = (state = Boolean, { type } ) => {
  switch (type) {
    case ENABLETOUCH:
      return state = !state;
    default:
    return state;
  }
}

export default enableTouchReducer;