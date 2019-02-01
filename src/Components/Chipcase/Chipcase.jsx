import React,{ Component } from 'react';
import { connect } from 'react-redux';
import "./Chipcase.css";
import ColorPicker from '../ColorPicker/ColorPicker';
import { 
  isMultipleTwentyFive, 
  removeUnusedChips, 
  addonsDistributionChipcase,
  colorChips,
  colorUp
 } from '../../Utils/Utils';
 import { changePickerColorAction } from '../../Actions/Actions';

class Chipcase extends Component {
  constructor(){
    super();
    this.state = {
      colors : [
        { 
          colorOne: "",
          colorTwo: ""
        },
        { 
          colorOne: "",
          colorTwo: ""
        },
        { 
          colorOne: "",
          colorTwo: ""
        },
        {
          colorOne: "",
          colorTwo: ""
        },
        {
          colorOne: "",
          colorTwo: ""
        }
      ],
    }
  };
  
  componentDidMount(){
    this.drawCanvas(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.drawCanvas(nextProps);
  }

  drawCanvas = (props) => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.clearRect(0, 0 , canvas.width, canvas.height);

    let chipValues = [1,5,25,100,500,1000,5000,10000,25000,100000];
    removeUnusedChips(chipValues, props.minChip);

    ctx.fillStyle = "#c2c2a3";
    ctx.save();
    ctx.fillRect(canvas.width * (5/100), canvas.height * (3/100), canvas.width * (2/100), canvas.height * (82/100));
    ctx.fillRect(canvas.width * (5/100), canvas.height * (2/100), canvas.width * (90/100), canvas.height * (2/100));
    ctx.fillRect(canvas.width * (94/100), canvas.height * (2/100), canvas.width * (2/100), canvas.height * (84/100));
    ctx.fillRect(canvas.width * (5/100), canvas.height * (84/100), canvas.width * (90/100), canvas.height * (2/100));

    ctx.save();
    ctx.font = "30px Arial";
    ctx.fillStyle = "#20A6DB";
    ctx.textAlign = "center";
    ctx.fillText(`Total ${props.totalChipset}`, canvas.width * (54/100), canvas.height * (81/100));

    let indexMinChip = 0;
    let coinY = 14;
    let valueY = 15;
    let startColumn = 8;
    let heightColumns;
    if(props.recave){
      let addons = addonsDistributionChipcase(props.extraRules.addonsChips, chipValues, props);
      heightColumns = this.setRatioColumn(props, addons, chipValues);
    } else {
      heightColumns = this.setRatioColumn(props, 0, chipValues);
    }

    for(let y = 0 ; y < colorChips.length ; y++){
      if(colorChips[y].value === props.minChip){
        indexMinChip = y;
      }
    }
  
    if(props.colorData === true){
      let box = this.state.colors;
      for(let i = 0; i < this.state.colors.length ; i++){
        box[i].colorOne = colorChips[i + indexMinChip].colorOne;
        box[i].colorTwo = colorChips[i + indexMinChip].colorTwo;
      }
      this.setState({ colors : box });
      for(let i = indexMinChip; i <= indexMinChip + 4 ; i++){
        this.generateChip(ctx, `${colorChips[i].colorOne}`, `${colorChips[i].colorOne}`, `${colorChips[i].colorTwo}`, canvas.width* (52.5/100), canvas.height * (coinY/100), canvas.width * (3.6/100), canvas.width * (3.9/100));
        this.generateChipColumn(ctx, `${colorChips[i].colorOne}`,`${colorChips[i].colorTwo}`, canvas.width * (startColumn/100), canvas.height * (83/100), heightColumns[i - indexMinChip], canvas.width*(2/100), canvas.height * (1.3/100), canvas.height * (1.5/100));
        this.generateValue(ctx, canvas.width * (52.5/100), canvas.height * (valueY/100), `${chipValues[i - indexMinChip]}`);
        coinY += 13; 
        valueY += 13;
        if(i === indexMinChip + 2){
          startColumn += 38;
        } else {
          startColumn += 12;
        }
      }
    } else if(props.colorData === false){
      for(let i = indexMinChip; i <= indexMinChip + 4 ; i++){
        this.generateChip(ctx, `${this.state.colors[i - indexMinChip].colorOne}`, `${this.state.colors[i - indexMinChip].colorOne}`, `${this.state.colors[i - indexMinChip].colorTwo}`, canvas.width* (52.5/100), canvas.height * (coinY/100), canvas.width * (3.6/100), canvas.width * (3.9/100));
        this.generateChipColumn(ctx, `${this.state.colors[i - indexMinChip].colorOne}`,`${this.state.colors[i - indexMinChip].colorTwo}`, canvas.width * (startColumn/100), canvas.height * (83/100), heightColumns[i - indexMinChip], canvas.width*(2/100), canvas.height * (1.3/100), canvas.height * (1.5/100));
        this.generateValue(ctx, canvas.width * (52.5/100), canvas.height * (valueY/100), `${chipValues[i - indexMinChip]}`);
        coinY += 13; 
        valueY += 13;
        if(i === indexMinChip + 2){
          startColumn += 38;
        } else {
          startColumn += 12;
        }
      }
    }

    if(props.recave){
      let addons = addonsDistributionChipcase(props.extraRules.addonsChips, chipValues, props);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (15/100), `${isMultipleTwentyFive(props.nbrChipOne * props.maxPlayers + props.nbrChipOne * props.extraRules.maxRebuys + addons.nbrChipOne*props.extraRules.maxAddons + colorUp(props.nbrChipOne, chipValues, 0, props, addons.nbrChipOne))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (28/100), `${isMultipleTwentyFive(props.nbrChipTwo * props.maxPlayers + props.nbrChipTwo * props.extraRules.maxRebuys + addons.nbrChipTwo*props.extraRules.maxAddons + colorUp(props.nbrChipTwo, chipValues, 1, props, addons.nbrChipTwo))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (41/100), `${isMultipleTwentyFive(props.nbrChipThree * props.maxPlayers + props.nbrChipThree * props.extraRules.maxRebuys + addons.nbrChipThree*props.extraRules.maxAddons + colorUp(props.nbrChipThree, chipValues, 2, props, addons.nbrChipThree))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (54/100), `${isMultipleTwentyFive(props.nbrChipFour * props.maxPlayers + props.nbrChipFour * props.extraRules.maxRebuys + addons.nbrChipFour*props.extraRules.maxAddons + colorUp(props.nbrChipFour, chipValues, 3, props, addons.nbrChipFour))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (67/100), `${isMultipleTwentyFive(props.nbrChipFive * props.maxPlayers + props.nbrChipFive * props.extraRules.maxRebuys + addons.nbrChipFive*props.extraRules.maxAddons + colorUp(props.nbrChipFive, chipValues, 4, props, addons.nbrChipFive))}`);
    } else {
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (15/100), `${isMultipleTwentyFive(props.nbrChipOne * props.maxPlayers + colorUp(props.nbrChipOne, chipValues, 0, props, 0))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (28/100), `${isMultipleTwentyFive(props.nbrChipTwo * props.maxPlayers + colorUp(props.nbrChipTwo, chipValues, 1, props, 0))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (41/100), `${isMultipleTwentyFive(props.nbrChipThree * props.maxPlayers + colorUp(props.nbrChipThree, chipValues, 2, props, 0))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (54/100), `${isMultipleTwentyFive(props.nbrChipFour * props.maxPlayers + colorUp(props.nbrChipFour, chipValues, 3, props, 0))}`);
      this.generateNrValue(ctx, canvas.width * (62.5/100), canvas.height * (67/100), `${isMultipleTwentyFive(props.nbrChipFive * props.maxPlayers + colorUp(props.nbrChipFive, chipValues, 4, props, 0))}`);
    }
  }

  generateChipColumn = (ctx, color1, color2, x, y, height, widthPixel, heightPixel, heightChips) => {
    for(let i = 1; i <= height; i++) {
      if(i % 2 === 0){
        ctx.fillStyle = color1;
        ctx.save();
        ctx.fillRect(x + widthPixel, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillRect(x + widthPixel * 3, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillStyle = color2;
        ctx.save();
        ctx.fillRect(x, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillRect(x + widthPixel * 2, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillRect(x + widthPixel * 4, y - heightChips * i, widthPixel, heightPixel);
      } else {
        ctx.fillStyle = color2;
        ctx.save();
        ctx.fillRect(x + widthPixel, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillRect(x + widthPixel * 3, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillStyle = color1;
        ctx.save();
        ctx.fillRect(x, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillRect(x + widthPixel * 2, y - heightChips * i, widthPixel, heightPixel);
        ctx.fillRect(x + widthPixel * 4, y - heightChips * i, widthPixel, heightPixel);
      }
    }
  }

  generateValue = (ctx, positionX, positionY, value) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    if(Number(value) >= 1000){
      value = (Number(value/1000)).toString() + "K";
      ctx.fillText(value, positionX, positionY);
    } else {
      ctx.fillText(value, positionX, positionY);
    }
  }

  generateNrValue = (ctx, positionX, positionY, value) => {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(`X ${value}`, positionX, positionY);
  }

  generateChip = (ctx, color1, color2, color3, startPosition, startPosition2, rayCircle, rayBorder) => {
    this.generateChipCenter(ctx, color1, startPosition, startPosition2, rayCircle);

    this.generateFirstBorderColor(ctx, color2, startPosition, startPosition2, rayBorder, 1.5, 1.7);
    this.generateFirstBorderColor(ctx, color2, startPosition, startPosition2, rayBorder, 1.9, 0.1);
    this.generateFirstBorderColor(ctx, color2, startPosition, startPosition2, rayBorder, 0.3, 0.5);
    this.generateFirstBorderColor(ctx, color2, startPosition, startPosition2, rayBorder, 0.7, 0.9);
    this.generateFirstBorderColor(ctx, color2, startPosition, startPosition2, rayBorder, 1.1, 1.3);

    this.generateFirstBorderColor(ctx, color3, startPosition, startPosition2, rayBorder, 1.7, 1.9);
    this.generateFirstBorderColor(ctx, color3, startPosition, startPosition2, rayBorder, 0.1, 0.3);
    this.generateFirstBorderColor(ctx, color3, startPosition, startPosition2, rayBorder, 0.5, 0.7);
    this.generateFirstBorderColor(ctx, color3, startPosition, startPosition2, rayBorder, 0.9, 1.1);
    this.generateFirstBorderColor(ctx, color3, startPosition, startPosition2, rayBorder, 1.3, 1.5);
  }

  generateFirstBorderColor = (ctx, color2, startPosition, startPosition2, rayBorder, startBorder, endBorder) => {
    ctx.beginPath();
    ctx.strokeStyle = color2;
    ctx.arc(startPosition, startPosition2, rayBorder, Math.PI * startBorder, Math.PI * endBorder);
    ctx.lineWidth = 7;
    ctx.stroke();
  }

  generateSecondBorderColor = (ctx, color3, startPosition, startPosition2, rayBorder, startBorder, endBorder) => {
    ctx.beginPath();
    ctx.strokeStyle = color3;
    ctx.arc(startPosition, startPosition2, rayBorder, Math.PI * startBorder, Math.PI * endBorder);
    ctx.lineWidth = 7;
    ctx.stroke();
  }

  generateChipCenter = (ctx, color1, startPosition, startPosition2, rayCircle) => {
    ctx.beginPath(); 
    ctx.arc(startPosition, startPosition2, rayCircle, 0, Math.PI * 2, true);
    ctx.fillStyle = color1;
    ctx.fill();
    ctx.closePath();
  }

  handleChangeFirstColor = (e, index) => {
    let color = this.state.colors;
    color[index].colorOne = e.hex;
    this.setState({ colors: color },() => {
      this.drawCanvas(this.props);
    })
    this.props.handleChangeColorDataPicker();
  }

  handleChangeSecondColor = (e, index) => {
    let color = this.state.colors;
    color[index].colorTwo = e.hex;
    this.setState({ colors: color },() => {
      this.drawCanvas(this.props);
    })
    this.props.handleChangeColorDataPicker();
  }

  setRatioColumn = (props, addons, chipValues) => {
    let chipCounts = [];
    if(addons === 0){
      chipCounts = [
        isMultipleTwentyFive(props.nbrChipOne * props.maxPlayers + colorUp(props.nbrChipOne, chipValues, 0, props, 0)),
        isMultipleTwentyFive(props.nbrChipTwo * props.maxPlayers + colorUp(props.nbrChipTwo, chipValues, 1, props, 0)), 
        isMultipleTwentyFive(props.nbrChipThree * props.maxPlayers + colorUp(props.nbrChipThree, chipValues, 2, props, 0)), 
        isMultipleTwentyFive(props.nbrChipFour * props.maxPlayers + colorUp(props.nbrChipFour, chipValues, 3, props, 0)), 
        isMultipleTwentyFive(props.nbrChipFive * props.maxPlayers + colorUp(props.nbrChipFive, chipValues, 4, props, 0))
      ];
    } else { 
      chipCounts = [
        isMultipleTwentyFive(props.nbrChipOne * props.maxPlayers + props.nbrChipOne * props.extraRules.maxRebuys + addons.nbrChipOne * props.extraRules.maxAddons + colorUp(props.nbrChipOne, chipValues, 0, props, addons.nbrChipOne)),
        isMultipleTwentyFive(props.nbrChipTwo * props.maxPlayers + props.nbrChipTwo * props.extraRules.maxRebuys + addons.nbrChipTwo * props.extraRules.maxAddons + colorUp(props.nbrChipTwo, chipValues, 1, props, addons.nbrChipTwo)), 
        isMultipleTwentyFive(props.nbrChipThree * props.maxPlayers + props.nbrChipThree * props.extraRules.maxRebuys + addons.nbrChipThree * props.extraRules.maxAddons + colorUp(props.nbrChipThree, chipValues, 2, props, addons.nbrChipThree)), 
        isMultipleTwentyFive(props.nbrChipFour * props.maxPlayers + props.nbrChipFour * props.extraRules.maxRebuys + addons.nbrChipFour * props.extraRules.maxAddons + colorUp(props.nbrChipFour, chipValues, 3, props, addons.nbrChipFour)), 
        isMultipleTwentyFive(props.nbrChipFive * props.maxPlayers + props.nbrChipFive * props.extraRules.maxRebuys + addons.nbrChipFive * props.extraRules.maxAddons + colorUp(props.nbrChipFive, chipValues, 4, props, addons.nbrChipFive))
      ];
    }
    let biggestPile = 0;
    let index = 0;
    let heightColumn = [0,0,0,0,0];
    for( let i = 0 ; i < chipCounts.length ; i++){
      if(biggestPile <= chipCounts[i]){
        biggestPile = chipCounts[i];
        index = i;
      }
    }
    for(let y = 0 ; y < chipCounts.length ; y++){
      if(y === index && biggestPile !== 0){
        heightColumn[index] = 50;
      } else {
        heightColumn[y] = Math.ceil(((chipCounts[y]/chipCounts[index]) * 100)/2);
      }
    }
    return heightColumn;
  }

  render() {
    return(
      <div>
        <div className="d-none d-lg-block">
          <ColorPicker
            toggleColorPicker={true}
            handleChangeFirstColor={this.handleChangeFirstColor}
            handleChangeSecondColor={this.handleChangeSecondColor}
            colors={this.state.colors}
          />
        </div>
        <div className="canvas d-none d-lg-block">
          <canvas ref="canvas" width={window.clientWidth} height={window.clientHeight}></canvas>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store =>({
  nbrChipOne: store.chipset.nbrChipOne,
  nbrChipTwo: store.chipset.nbrChipTwo,
  nbrChipThree: store.chipset.nbrChipThree,
  nbrChipFour: store.chipset.nbrChipFour,
  nbrChipFive: store.chipset.nbrChipFive,
  chipOne: store.chipset.chipOne,
  chipTwo: store.chipset.chipTwo,
  chipThree: store.chipset.chipThree,
  chipFour: store.chipset.chipFour,
  chipFive: store.chipset.chipFive,
  maxPlayers: store.maxPlayers,
  minChip: store.settings.minChip,
  colorChips: store.colorChips,
  totalChipset: store.totalChipset,
  extraRules: store.extraRules,
  recave: store.recave,
  colorData: store.colorData
});

const mapActionToProps ={
  handleChangeColorDataPicker: changePickerColorAction
}

export default connect(mapStateToProps, mapActionToProps)(Chipcase);
