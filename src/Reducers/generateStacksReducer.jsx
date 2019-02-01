import { GENERATESTACKS } from '../Actions/Actions';

const generateStacksReducer = (state = "", {type, payload}) => {
  switch (type) {
    case GENERATESTACKS:
      return state = setPossibleStack(payload.minChip);
    default:
      return state;
  }
};

function setPossibleStack(minChip){
  let interval = 0;
  let dataStack = [];
  if(minChip === 1){
    interval = minChip * 25;
  } else if(minChip === 5 || minChip === 25){
    interval = minChip * 20;
  } else if(minChip === 100){
    interval = minChip * 10;
  }
  for(let i = minChip * 100 ; i < minChip * 1000 ; i += interval){
    dataStack.push(i);
  }
  return dataStack;
}

export default generateStacksReducer;