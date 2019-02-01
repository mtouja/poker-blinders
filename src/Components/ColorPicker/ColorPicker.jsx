import React,{ Component } from 'react';
import './ColorPicker.css';
import { SketchPicker } from 'react-color';
import { enableTouchAction } from '../../Actions/Actions';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { colorChips } from '../../Utils/Utils';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: [false,false,false,false,false,false,false,false,false,false],
      indexMinChip: 0
    };
  }

  componentDidMount() {
    for(let y = 0 ; y < colorChips.length ; y++){
      if(colorChips[y].value === this.props.minChip){
        this.setState({ indexMinChip: y });
      }
    }
  }

  handleClickPicker = (index) => {
    let toggle = this.state.displayColorPicker;
    toggle[index] = true;
    this.setState({ displayColorPicker : toggle });
    this.props.enableSidebarTouch();
  }

  handleClosePicker = (index) => {
    let toggle = this.state.displayColorPicker;
    toggle[index] = false;
    this.setState({ displayColorPicker : toggle });
    this.props.enableSidebarTouch();
  }

  render() {
    if(this.props.colors){
      return(
        <div>
          <Row>
            <Col>
              <p>Clicking on each button below, you can design your chips with your favorite colors.</p>
            </Col>
          </Row>
          {this.props.toggleColorPicker ?
            <Row className="d-flex justify-content-center">
            {this.props.colors.map((color, index) => {
              return(
              <Col key={index} xs={2} sm={2} md={2} lg={2} id={`positionColorPicker${index}`}>
                <div className="swatch"  id={`positionColorPickerOne${index}`}>
                  <div className="color" style={color.colorOne ? {background: color.colorOne} : { background: colorChips[index + this.state.indexMinChip].colorOne}} onClick={ () => {this.handleClickPicker(index + index)} }></div>
                </div>
                {this.state.displayColorPicker[index+index] ?
                <div className="popover">
                  <div className="cover" onClick={ () => {this.handleClosePicker(index + index)} }></div>
                  <SketchPicker color={color.colorOne} onChange={ (e) => {this.props.handleChangeFirstColor(e, index)} } />
                </div>
                : null}
                <div className="swatch" id={`positionColorPickerTwo${index}`}>
                  <div className="color" style={color.colorOne ? {background: color.colorTwo} : { background: colorChips[index + this.state.indexMinChip].colorTwo}} onClick={ () => {this.handleClickPicker(2 * index + 1)} }></div>
                </div>
                {this.state.displayColorPicker[2 * index + 1] ?
                <div className="popover">
                  <div className="cover" onClick={ () => {this.handleClosePicker(2 * index + 1)} }></div>
                  <SketchPicker color={color.colorTwo} onChange={ (e) => {this.props.handleChangeSecondColor(e, index)} } />
                </div>
                : null}
              </Col>
              );
            })}
          </Row>
          :
          <Row className="d-flex justify-content-center">
            {this.props.colors.map((color, index) => {
              return(
              <Col className="px-0" key={index} xs={2} sm={2} md={2} lg={2}>
                <div className="swatch">
                  <div className="color" style={color.colorOne ? {background: color.colorOne} : { background: colorChips[index + this.state.indexMinChip].colorOne}} onClick={ () => {this.handleClickPicker(index + index)} }></div>
                </div>
                {this.state.displayColorPicker[index + index] ?
                <div className={`popoverOne${index}`}>
                  <div className="cover" onClick={ () => {this.handleClosePicker(index + index)} }></div>
                  <SketchPicker color={color.colorOne} onChange={ (e) => {this.props.handleChangeFirstColor(e, index)} } />
                </div>
                : null}
                <div className="swatch">
                  <div className="color" style={color.colorOne ? {background: color.colorTwo} : { background: colorChips[index + this.state.indexMinChip].colorTwo}} onClick={ () => {this.handleClickPicker(2 * index + 1)} }></div>
                </div>
                {this.state.displayColorPicker[2 * index + 1] ?
                <div className={`popoverTwo${index}`}>
                  <div className="cover" onClick={ () => {this.handleClosePicker(2 * index + 1)} }></div>
                  <SketchPicker color={color.colorTwo} onChange={ (e) => {this.props.handleChangeSecondColor(e, index)} } />
                </div>
                : null}
              </Col>
            )
            })}
          </Row>
          }
        </div>
      );
    } else { 
      return null;
    }
  }
}

const mapActionsToProps = {
  enableSidebarTouch : enableTouchAction,
}

const mapStateToProps = store => ({
  minChip: store.settings.minChip
})

export default connect(mapStateToProps, mapActionsToProps)(ColorPicker);