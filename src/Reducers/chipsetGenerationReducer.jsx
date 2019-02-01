import { 
  GENERATECHIPSET,
  MORECHIPS,
  LESSCHIPS
} from '../Actions/Actions';
import { 
  removeUnusedChips,
  totalStack,
  initStackDistribution,
  setStateChips
} from '../Utils/Utils';

const chipsetGenerationReducer = (state = "", {type, payload}) => {
  switch (type) {
    case GENERATECHIPSET:
      let data = initStackDistribution(payload.startingStack, payload.minChip, state, removeUnusedChips, totalStack, setStateChips);
      return {...state,
        chipOne: data.chipOne,
        chipTwo: data.chipTwo,
        chipThree: data.chipThree,
        chipFour: data.chipFour,
        chipFive: data.chipFive,
        nbrChipOne: data.nbrChipOne,
        nbrChipTwo: data.nbrChipTwo,
        nbrChipThree: data.nbrChipThree,
        nbrChipFour: data.nbrChipFour,
        nbrChipFive: data.nbrChipFive
      };
    case MORECHIPS:
      let moreChips = addMoreChips(state, setStateChips);
      return {...state,
        chipOne: moreChips.chipOne,
        chipTwo: moreChips.chipTwo,
        chipThree: moreChips.chipThree,
        chipFour: moreChips.chipFour,
        chipFive: moreChips.chipFive,
        nbrChipOne: moreChips.nbrChipOne,
        nbrChipTwo: moreChips.nbrChipTwo,
        nbrChipThree: moreChips.nbrChipThree,
        nbrChipFour: moreChips.nbrChipFour,
        nbrChipFive: moreChips.nbrChipFive
      };
    case LESSCHIPS:
      let lessChips = removeChips(state, setStateChips);
      return {...state,
        chipOne: lessChips.chipOne,
        chipTwo: lessChips.chipTwo,
        chipThree: lessChips.chipThree,
        chipFour: lessChips.chipFour,
        chipFive: lessChips.chipFive,
        nbrChipOne: lessChips.nbrChipOne,
        nbrChipTwo: lessChips.nbrChipTwo,
        nbrChipThree: lessChips.nbrChipThree,
        nbrChipFour: lessChips.nbrChipFour,
        nbrChipFive: lessChips.nbrChipFive
      };
    default:
      return state;
  }
}

function getChipValueArray(state) {
  let chipValues = [];
  chipValues.push(state.chipOne);
  chipValues.push(state.chipTwo);
  chipValues.push(state.chipThree);
  chipValues.push(state.chipFour);
  chipValues.push(state.chipFive);
  return chipValues;
}

function getChipCountArray(state) {
  let chipCounts = [];
  chipCounts.push(state.nbrChipOne);
  chipCounts.push(state.nbrChipTwo);
  chipCounts.push(state.nbrChipThree);
  chipCounts.push(state.nbrChipFour);
  chipCounts.push(state.nbrChipFive);
  return chipCounts;
}

function setTargetPile(target, chipCounts) {
  let index = 0;
  if(target === "biggestMore"){
    let biggestPile = chipCounts[1];
    for( let i = 1 ; i < chipCounts.length ; i++){
      if(biggestPile <= chipCounts[i]){
        biggestPile = chipCounts[i];
        index = i;
      }
    }
  } else if(target === "biggest"){
    let biggestPile = chipCounts[0];
    for( let i = 0 ; i < chipCounts.length ; i++){
      if(biggestPile <= chipCounts[i]){
        biggestPile = chipCounts[i];
        index = i;
      }
    }
  }
  return index;
}

function columnRatio(index, chipValues, chipCounts) {
  let ratio = chipValues[index] / chipValues[index - 1];
  chipCounts[index - 1] += ratio;
  chipCounts[index] -= 1;
  return chipCounts;
}

function addMoreChips(state, setStateChips){
  let chipValues = getChipValueArray(state);
  let chipCounts = getChipCountArray(state);

  let index = setTargetPile("biggestMore", chipCounts);
  if(chipCounts[4] > 0){
    index = 4;
    columnRatio(index, chipValues, chipCounts);
  } else if((chipCounts[3] > 0 && chipCounts[3] > chipCounts[2]) ||
   (chipCounts[0] > chipCounts[1] && chipCounts[3] > 0)) {
    index = 3;
    columnRatio(index, chipValues, chipCounts);
  } else if(chipCounts[2] > 0 && chipCounts[0] >= 100){
    index = 2;
    columnRatio(index, chipValues, chipCounts);
  } else if(chipCounts[0] < 100) {
    columnRatio(index, chipValues, chipCounts);
  }

  state = setStateChips(chipValues, chipCounts, state);
  return state;
}

function removeChips(state, setStateChips){
  let chipValues = getChipValueArray(state);
  let chipCounts = getChipCountArray(state);
  let index = setTargetPile("biggest", chipCounts);
  let ratio = chipValues[index + 1] / chipValues[index];
  let limitFirstChip = chipValues[1] / chipValues[0];
  let limitSecondChip = (chipValues[2] - chipValues[1]) / chipValues[1];

  if((index === 0 && chipCounts[index] - ratio < limitFirstChip) ||
    (index === 1 && chipCounts[index] - ratio < limitSecondChip)){
    if(chipCounts[0] - limitFirstChip >= limitFirstChip && 
      chipCounts[1] - limitSecondChip >= limitSecondChip){
        chipCounts[2] += 1;
        chipCounts[1] -= limitSecondChip;
        chipCounts[0] -= limitFirstChip;
    }
  } else if(chipCounts[index] - ratio > 0){
    chipCounts[index] -= ratio;
    chipCounts[index + 1] += 1;
  }
  state = setStateChips(chipValues, chipCounts, state);
  return state;
}

export default chipsetGenerationReducer;