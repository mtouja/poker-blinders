export const SELECTMINCHIP = "settings: selectMinChipAction";
export const SELECTSTARTINGSTACK = "settings: selectStartingStackAction";
export const GENERATESTACKS = "possiblestack: generatePossibleStackAction";
export const GENERATECHIPSET = "chipset: generateChipsetAction";
export const SELECTMAXPLAYERS = "settings: selectMaxPlayersAction";
export const MORECHIPS = "addchips: selectMoreChipsAction";
export const LESSCHIPS = "removechips: selectLessChipsAction";
export const ENABLETOUCH= "enabletouch: enableTouchAction";
export const TOTALCHIPSET = "settotal: setTotalChipsetAction";
export const SETEXTRARULES = "setextrarules : setExtraRulesAction";
export const SETRECAVE = "setrecave : setRecaveAction";
export const DATACOLORMINCHIP = "colordata : changeMinchipColorAction";
export const DATACOLORPICKER = "colordata : changePickerColorAction";


export const selectMinChipAction = (minChip) => {
  return{
    type : SELECTMINCHIP,
    payload : {
      minChip : minChip
    }
  };
};

export const generatePossibleStacksAction = (minChip) => {
  return{
    type : GENERATESTACKS,
    payload : {
      minChip : minChip
    }
  };
};

export const selectStartingStackAction = (selectStack, minChip) => {
  return{
    type : SELECTSTARTINGSTACK,
    payload : {
      startingStack : selectStack,
      minChip : minChip
    }
  };
};

export const generateChipsetAction = (startingStack , minChip) => {
  return{
    type : GENERATECHIPSET,
    payload : {
      startingStack : startingStack,
      minChip : minChip
    }
  };
};

export const selectMaxPlayersAction = (maxPlayers) => {
  return{
    type : SELECTMAXPLAYERS,
    payload : {
      maxPlayers : maxPlayers
    }
  };
};

export const selectMoreChipsAction = () => {
  return{
    type : MORECHIPS
  };
};

export const selectLessChipsAction = () => {
  return{
    type : LESSCHIPS
  };
};

export const enableTouchAction = () => {
  return {
    type: ENABLETOUCH
  };
};

export const setTotalChipsetAction = (totalChipset) => {
  return{
    type : TOTALCHIPSET,
    payload: {
      totalChipset: totalChipset
    }
  };
};

export const setExtraRulesAction = (maxRebuys, addonsChips, maxAddons) => {
  return{
    type : SETEXTRARULES,
    payload: {
      maxRebuys: maxRebuys,
      addonsChips: addonsChips,
      maxAddons: maxAddons
    }
  };
};

export const setRecaveAction = () => {
  return{
    type : SETRECAVE
  };
};

export const changeMinchipColorAction = () => {
  return{
    type : DATACOLORMINCHIP
  };
};

export const changePickerColorAction = () => {
  return{
    type : DATACOLORPICKER
  };
};