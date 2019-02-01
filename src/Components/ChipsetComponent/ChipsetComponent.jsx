import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import './ChipsetComponent.css';
import { 
  isMultipleTwentyFive, 
  removeUnusedChips, 
  addonsDistributionChipcase,
  colorChips,
  colorUp
} from '../../Utils/Utils';
import ColorPicker from '../ColorPicker/ColorPicker';
import { changePickerColorAction } from '../../Actions/Actions';



 class ChipsetComponent extends Component {
  constructor(props){
    super(props);
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
    };
  }

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

      let chipValues = [1,5,25,100,500,1000,5000,10000,25000,100000];
      removeUnusedChips(chipValues, props.minChip);

      let indexMinChip = 0;
      let coinX = 10;
  
      for(let y = 0 ; y < colorChips.length ; y++){
        if(colorChips[y].value === props.minChip){
          indexMinChip = y;
        }
      }

      if(props.colorData === true){
        let box = this.state.colors;
        for(let i = 0 ; i < this.state.colors.length ; i++){
          box[i].colorOne = colorChips[i + indexMinChip].colorOne;
          box[i].colorTwo = colorChips[i + indexMinChip].colorTwo;
        }
        this.setState({ colors : box });
        for(let i = indexMinChip; i <= indexMinChip + 4 ; i++){
          this.generateChipValue(ctx, `${colorChips[i].colorOne}`, `${colorChips[i].colorOne}`, `${colorChips[i].colorTwo}`, canvas.width* (coinX/100), canvas.height * (40/100), canvas.width * (7/100), canvas.width * (7.1/100));
          coinX += 20;
        }
      } else if(props.colorData === false){
        for(let i = indexMinChip; i <= indexMinChip + 4 ; i++){
          this.generateChipValue(ctx, `${this.state.colors[i - indexMinChip].colorOne}`, `${this.state.colors[i - indexMinChip].colorOne}`, `${this.state.colors[i - indexMinChip].colorTwo}`, canvas.width* (coinX/100), canvas.height * (40/100), canvas.width * (7/100), canvas.width * (7.1/100));
          coinX += 20;
        }
      }

      this.generateValue(ctx, canvas.width * (10/100), canvas.height * (45/100), `${chipValues[0]}`);
      this.generateValue(ctx, canvas.width * (30/100), canvas.height * (45/100), `${chipValues[1]}`);
      this.generateValue(ctx, canvas.width * (50/100), canvas.height * (45/100), `${chipValues[2]}`);
      this.generateValue(ctx, canvas.width * (70/100), canvas.height * (45/100), `${chipValues[3]}`);
      this.generateValue(ctx, canvas.width * (90/100), canvas.height * (45/100), `${chipValues[4]}`);

      if(props.recave){
        let addons = addonsDistributionChipcase(props.extraRules.addonsChips, chipValues, props);
        this.generateNrValue(ctx, canvas.width * (10/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipOne*props.maxPlayers + props.nbrChipOne*props.extraRules.maxRebuys + addons.nbrChipOne*props.extraRules.maxAddons + colorUp(props.nbrChipOne, chipValues, 0, props, addons.nbrChipOne))}`);
        this.generateNrValue(ctx, canvas.width * (30/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipTwo*props.maxPlayers + props.nbrChipTwo*props.extraRules.maxRebuys + addons.nbrChipTwo*props.extraRules.maxAddons + colorUp(props.nbrChipTwo, chipValues, 1, props, addons.nbrChipTwo))}`);
        this.generateNrValue(ctx, canvas.width * (50/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipThree*props.maxPlayers + props.nbrChipThree*props.extraRules.maxRebuys + addons.nbrChipThree*props.extraRules.maxAddons + colorUp(props.nbrChipThree, chipValues, 2, props, addons.nbrChipThree))}`);
        this.generateNrValue(ctx, canvas.width * (70/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipFour*props.maxPlayers + props.nbrChipFour*props.extraRules.maxRebuys + addons.nbrChipFour*props.extraRules.maxAddons + colorUp(props.nbrChipFour, chipValues, 3, props, addons.nbrChipFour))}`);
        this.generateNrValue(ctx, canvas.width * (90/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipFive*props.maxPlayers + props.nbrChipFive*props.extraRules.maxRebuys + addons.nbrChipFive*props.extraRules.maxAddons + colorUp(props.nbrChipFive, chipValues, 4, props, addons.nbrChipFive))}`);
      } else {
        this.generateNrValue(ctx, canvas.width * (10/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipOne*props.maxPlayers + colorUp(props.nbrChipOne, chipValues, 0, props, 0))}`);
        this.generateNrValue(ctx, canvas.width * (30/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipTwo*props.maxPlayers + colorUp(props.nbrChipTwo, chipValues, 1, props, 0))}`);
        this.generateNrValue(ctx, canvas.width * (50/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipThree*props.maxPlayers + colorUp(props.nbrChipThree, chipValues, 2, props, 0))}`);
        this.generateNrValue(ctx, canvas.width * (70/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipFour*props.maxPlayers + colorUp(props.nbrChipFour, chipValues, 3, props, 0))}`);
        this.generateNrValue(ctx, canvas.width * (90/100), canvas.height * (98/100), `${isMultipleTwentyFive(props.nbrChipFive*props.maxPlayers + colorUp(props.nbrChipFive, chipValues, 4, props, 0))}`);
      }
  }

    generateFirstBorderColor = (ctx, color2, startPosition, startPosition2, rayBorder, startBorder, endBorder) => {
      ctx.beginPath();
      ctx.strokeStyle = color2;
      ctx.arc(startPosition, startPosition2, rayBorder, Math.PI * startBorder, Math.PI * endBorder);
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  
    generateSecondBorderColor = (ctx, color3, startPosition, startPosition2, rayBorder, startBorder, endBorder) => {
      ctx.beginPath();
      ctx.strokeStyle = color3;
      ctx.arc(startPosition, startPosition2, rayBorder, Math.PI * startBorder, Math.PI * endBorder);
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  
    generateChipCenter = (ctx, color1, startPosition, startPosition2, rayCircle) => {
      ctx.beginPath();
      ctx.arc(startPosition, startPosition2, rayCircle, 0, Math.PI * 2, true);
      ctx.fillStyle = color1;
      ctx.fill();
      ctx.closePath();
  }


    generateValue = (ctx, positionX, positionY, value) => {
      ctx.font = "15px Arial";
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
      ctx.font = "15px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(`X ${value}`, positionX, positionY);
    }

    generateChipValue = (ctx, color1, color2, color3, startPosition, startPosition2, rayCircle, rayBorder) => {
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

  render () {
    return (
    <Container className="h-100">
      <Row className="h-100">
        <h6 className="player-stack text-uppercase">Your tournament chipset</h6>
        <Col md={12} className="canvas-phone-box">
          <canvas className="canvas-phone" ref="canvas" width={window.clientWidth} height={window.clientHeight}></canvas>
        </Col>
        <Col md={12} className="color-picker-mobile">
          <ColorPicker
            toggleColorPicker={false}
            handleChangeFirstColor={this.handleChangeFirstColor}
            handleChangeSecondColor={this.handleChangeSecondColor}
            colors={this.state.colors}
          />
        </Col>
        <Col md={12} className="sample-price">
          <div className="d-flex justify-content-between">
            <p>Low quality<br/><em>Plastic Chips</em></p>
            <p><strong>{Math.floor(this.props.totalChipset/25 * 3.20)} €</strong></p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-left">Medium<br/><em>Clay Composite</em></p>
            <p><strong>{Math.floor(this.props.totalChipset/25 * 5.60)} €</strong></p>
          </div>
          <div className="d-flex justify-content-between">
            <p>High<br/><em>Clay</em></p>
            <p><strong>{Math.floor(this.props.totalChipset/25 * 6.70)} €</strong></p>
          </div>
        </Col>
        <Col md={12} className="total d-flex justify-content-between align-self-end w-100">
          <div className="d-flex justify-content-between">
            <p className="mr-3">TOTAL CHIPS</p>
            <p>{this.props.totalChipset}</p>
          </div>
          <div role="button" onClick={() => {this.props.onSetSidebarOpen(false)}}>
            <img className="return-button" src="https://i.ibb.co/wrnsn5m/undo-arrow.png" alt="return"></img>
          </div>
        </Col>
      </Row>
    </Container>
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
})

const mapActionToProps ={
  handleChangeColorDataPicker: changePickerColorAction
}

export default connect (mapStateToProps, mapActionToProps)(ChipsetComponent);
