export const isMultipleTwentyFive = (chips) => {
  let multiple = Math.ceil(chips/25) * 25;
  return multiple;
};

export const totalChipsPerPlayer = (props) => {
  let totalChipsPlayers = props.nbrChipOne + props.nbrChipTwo + props.nbrChipThree + props.nbrChipFour + props.nbrChipFive;
  return totalChipsPlayers;
};

export const removeUnusedChips = (chipValues, minChip) => {
  while(chipValues[0] < minChip){
    chipValues.shift();
  }
}

export const setStateChips = (chipValues, chipCounts, state) => {
  state = {...state,
    chipOne: chipValues[0],
    chipTwo: chipValues[1],
    chipThree: chipValues[2],
    chipFour: chipValues[3],
    chipFive: chipValues[4],
    nbrChipOne: chipCounts[0],
    nbrChipTwo: chipCounts[1],
    nbrChipThree: chipCounts[2],
    nbrChipFour: chipCounts[3],
    nbrChipFive: chipCounts[4]
  }
  return state;
}


export const totalStack = (chipValues, chipCounts) => {
   let totalChips = 0;
   for(let i = 0 ; i < chipCounts.length ; i++){
     totalChips += chipCounts[i]*chipValues[i]
   }
   return totalChips;
}

export const initStackDistribution = (startingStack, minChip, state, removeUnusedChips, totalStack, setStateChips) => {
  let chipValues = [1,5,25,100,500,1000,5000,10000,25000,100000];
  let chipCounts = [0,0,0,0,0,0,0];
  removeUnusedChips(chipValues, minChip);
  let remainingChips = startingStack;
  let chipIndex = 0;
  while(remainingChips>0 && chipIndex < chipCounts.length-2){
    let chipRatio = chipValues[chipIndex+1]/chipValues[chipIndex];
    let chipMultiplier = Math.floor(10/chipRatio);
    let currentValue = chipMultiplier*chipValues[chipIndex+1]-totalStack(chipValues,chipCounts);
    if(currentValue>remainingChips)
      currentValue = remainingChips;
    chipCounts[chipIndex] = Math.floor(currentValue/chipValues[chipIndex]);
    remainingChips = startingStack-totalStack(chipValues,chipCounts);
    chipIndex++;
  }
  chipIndex = chipCounts.length-1
  while(remainingChips>0 && chipIndex >=0){
    chipCounts[chipIndex] += Math.floor(remainingChips/chipValues[chipIndex]);
    remainingChips = startingStack-totalStack(chipValues,chipCounts);
    chipIndex--;
  }
  state = setStateChips(chipValues, chipCounts, state);
  return state ;
 }

export const colorChips = [{
    value: 1,
    colorOne: "#b8b894",
    colorTwo: "#fff"
  }, {
    value: 5,
    colorOne: "#ff3300",
    colorTwo: "#fff"
  }, {
    value: 25,
    colorOne: "#33cc33",
    colorTwo: "#fff"
  }, {
    value: 100,
    colorOne: "#000",
    colorTwo: "#fff"
  }, {
    value: 500,
    colorOne: "#993399",
    colorTwo: "#ffcc00"
  }, {
    value: 1000,
    colorOne: "#ffcc00",
    colorTwo: "#004080"
  }, {
    value: 5000,
    colorOne: "#ff6600",
    colorTwo: "#663300"
  }, {
    value: 25000,
    colorOne: "#00ffff",
    colorTwo: "#fff"
  }
];

export const addonsDistributionChipcase = (addonsChips, chipValues, props) => {
  let chipFive = 0;
  let chipFour = 0;
  let chipThree = 0;
  let chipTwo = 0;
  let chipOne = 0;
  while(addonsChips > 0){
    if(addonsChips - chipValues[4] >= 0){
      addonsChips -= chipValues[4];
      chipFive += 1;
    } else if(addonsChips - chipValues[3] >= 0){
      addonsChips -= chipValues[3];
      chipFour += 1;
    } else if(addonsChips - chipValues[2] >= 0) {
      addonsChips -= chipValues[2];
      chipThree += 1;
    } else if(addonsChips - chipValues[1] >= 0){
      addonsChips -= chipValues[1];
      chipTwo += 1;
    } else {
      addonsChips -= chipValues[0];
      chipOne += 1;
    }
  }
  props = {...props,
    nbrChipFive: chipFive,
    nbrChipFour: chipFour,
    nbrChipThree: chipThree,
    nbrChipTwo: chipTwo,
    nbrChipOne: chipOne
  };
  return props;
}

export const colorUp = (nbrChip, chipValues, i, props, addons) => {
  let colorUp = Math.ceil(((nbrChip * props.maxPlayers + nbrChip *
    props.extraRules.maxRebuys + addons * props.extraRules.maxAddons) *
    chipValues[i])/chipValues[i + 2]);
  return colorUp;
}