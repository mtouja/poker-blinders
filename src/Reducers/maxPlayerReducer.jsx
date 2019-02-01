import { SELECTMAXPLAYERS } from '../Actions/Actions';

const maxPlayerReducer = (state = "", { type, payload }) => {
  switch (type) {
    case SELECTMAXPLAYERS:
      return state = payload.maxPlayers;
    default:
      return state;
  }
};

export default maxPlayerReducer;
