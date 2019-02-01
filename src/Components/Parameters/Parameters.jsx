import React,{ Component } from 'react';
import { connect } from 'react-redux';
import "./Parameters.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
  Input,
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';
import Switch from 'react-switch';
import {
  selectMinChipAction,
  generatePossibleStacksAction,
  selectStartingStackAction,
  generateChipsetAction,
  selectMaxPlayersAction,
  selectMoreChipsAction,
  selectLessChipsAction,
  setTotalChipsetAction,
  setExtraRulesAction,
  setRecaveAction,
  changeMinchipColorAction
} from "../../Actions/Actions";
import {
  isMultipleTwentyFive,
  totalChipsPerPlayer,
  removeUnusedChips,
  addonsDistributionChipcase,
  colorUp
} from '../../Utils/Utils';

class Parameters extends Component {
  constructor(){
    super();
    this.state = {
      minChipOptions : [ 1, 5, 25, 100],
      dropdownOpenMinChip: false,
      dropdownOpenStartingStack: false,
      checkedRecave: false,
      maxRebuys: 0,
      maxAddons: 0,
      addonsChips: 0,
      modal: false,
      placeholder: 18
    };
  }

  componentDidMount() {
    this.props.handleGeneratePossibleStacks(this.props.minChip);
    this.props.handleGenerateChipset(this.props.startingStack, this.props.minChip);
    this.setState({ 
      maxRebuys: Math.floor(this.props.maxPlayers * 1.25),
      maxAddons: Math.floor(this.props.maxPlayers * 0.75),
      addonsChips: Math.floor(this.props.startingStack * 1.5),
    }, () => {
      this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
    });
  }

  totalChipset = (props) => {
    let chipValues = [1,5,25,100,500,1000,5000,10000,25000,100000];
    removeUnusedChips(chipValues, props.minChip);
    if(this.state.checkedRecave) {
      let addons = addonsDistributionChipcase(props.extraRules.addonsChips, chipValues, props);
      let totalChipset =
      isMultipleTwentyFive(props.nbrChipOne * props.maxPlayers + props.nbrChipOne * props.extraRules.maxRebuys + addons.nbrChipOne * props.extraRules.maxAddons + colorUp(props.nbrChipOne, chipValues, 0, props, addons.nbrChipOne)) +
      isMultipleTwentyFive(props.nbrChipTwo * props.maxPlayers + props.nbrChipTwo * props.extraRules.maxRebuys + addons.nbrChipTwo * props.extraRules.maxAddons + colorUp(props.nbrChipTwo, chipValues, 1, props, addons.nbrChipTwo)) +
      isMultipleTwentyFive(props.nbrChipThree * props.maxPlayers + props.nbrChipThree * props.extraRules.maxRebuys + addons.nbrChipThree * props.extraRules.maxAddons + colorUp(props.nbrChipThree, chipValues, 2, props, addons.nbrChipThree)) +
      isMultipleTwentyFive(props.nbrChipFour * props.maxPlayers + props.nbrChipFour * props.extraRules.maxRebuys + addons.nbrChipFour * props.extraRules.maxAddons + colorUp(props.nbrChipFour, chipValues, 3, props, addons.nbrChipFour)) +
      isMultipleTwentyFive(props.nbrChipFive * props.maxPlayers + props.nbrChipFive * props.extraRules.maxRebuys + addons.nbrChipFive * props.extraRules.maxAddons + colorUp(props.nbrChipFive, chipValues, 4, props, addons.nbrChipFive));
      this.props.setTotalChipset(totalChipset);
      return totalChipset;
    } else {
      let totalChipset = 
      isMultipleTwentyFive(props.nbrChipOne * props.maxPlayers + colorUp(props.nbrChipOne, chipValues, 0, props, 0)) +
      isMultipleTwentyFive(props.nbrChipTwo * props.maxPlayers + colorUp(props.nbrChipTwo, chipValues, 1, props, 0)) +
      isMultipleTwentyFive(props.nbrChipThree * props.maxPlayers + colorUp(props.nbrChipThree, chipValues, 2, props, 0)) +
      isMultipleTwentyFive(props.nbrChipFour * props.maxPlayers + colorUp(props.nbrChipFour, chipValues, 3, props, 0)) +
      isMultipleTwentyFive(props.nbrChipFive * props.maxPlayers + colorUp(props.nbrChipFive, chipValues, 4, props, 0));
      this.props.setTotalChipset(totalChipset);
      return totalChipset;
    }
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleMinChipInput = () => {
    this.setState(prevState => ({
      dropdownOpenMinChip: !prevState.dropdownOpenMinChip
    }));
  }

  toggleStartingStackInput = () => {
    this.setState(prevState => ({
      dropdownOpenStartingStack: !prevState.dropdownOpenStartingStack
    }));
  }

  handleChangeChips = (e) => {
    this.setState({ addonsChips: Math.floor(Number(e.target.value) * 1.5)},() => {
      this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
    });
    this.props.handleChangeStartingStack(Number(e.target.value), this.props.minChip);
    this.props.handleGenerateChipset(Number(e.target.value), this.props.minChip);
  }

  handleGenerateStacks = (e) => {
    this.setState({ addonsChips: Math.floor(Number(e.target.value) * 600)}, () => {
      this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
    });
    this.props.handleChangeMinChip(Number(e.target.value));
    this.props.handleGeneratePossibleStacks(Number(e.target.value));
    this.props.handleGenerateChipset((Number(e.target.value)) * 400, Number(e.target.value));
    this.props.handleChangeColorMinChip();
  }

  changeMaxPlayers = (e) => {
    if(Number(e.target.value) >= 0 && Number(e.target.value) <= 5000 ){
      this.props.handleChangeMaxPlayers(Number(e.target.value));
      this.setState({ 
        maxRebuys: Math.floor(Number(e.target.value) * 1.25),
        maxAddons: Math.floor(Number(e.target.value) * 0.75),
        addonsChips: Math.floor(this.props.startingStack * 1.5),
        placeholder: null
      }, () => {
        this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
      });
    }
  }

  changeMaxRebuys = (e) => {
    if(e.target.value >= 0 && e.target.value <= 5000 ){
      this.props.handleChangeMaxRebuys(e.target.value);
    }
  }

  handleChangeRecave = (checked) => {
    this.setState({ checkedRecave : checked });
    this.props.setRecave();
  }

  handleChangeMaxRebuys = (e) => {
    if(e.target.value >= 0 && e.target.value <= 5000 ){
      this.setState({ maxRebuys: e.target.value }, () => {
        this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
      });
    }
  }

  handleChangeMaxRebuysValue = () => {
    this.setState({
      maxRebuys: ""
    });
  }

  handleChangeMaxAddonsValue = () => {
    this.setState({
      maxAddons: ""
    });
  }

  handleChangeAddonsChipsValue = () => {
    this.setState({
      addonsChips: ""
    });
  }

  handleChangeMaxAddons = (e) => {
    if(e.target.value >= 0 && e.target.value <= 5000 ){
      this.setState({ maxAddons: e.target.value }, () => {
        this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
      });
    }
  }

  handleChangeAddonsChips = (e) => {
    this.setState({ addonsChips: e.target.value }, () => {
      this.props.setExtraRules(this.state.maxRebuys, this.state.addonsChips, this.state.maxAddons);
    });
  }

  isInputNumber (e) {
    let char = String.fromCharCode(e.which);
    if(!(/[0-9]/.test(char))) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <Container className="h-100">
        <Row className="title">
          <Col md={12} className="mt-1">
            <h6 className="text-uppercase">Tournament Parameters</h6>
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-end">
          <Col xs={6} md={6}>
            {this.state.checkedRecave ?
              <Label for="extra-rules" className="extra-rules">
                Rebuys
              </Label>
              :
              <Label for="extra-rules" className="text-uppercase selection mt-1">
                Rebuys 
              </Label>}
          </Col>
        </Row>
        <Row className="mt-4 d-flex justify-content-end">
          <Col xs={6} md={6}>
            <Label htmlFor="recave-button">
              <Switch
                checked={this.state.checkedRecave}
                onChange={this.handleChangeRecave}
                onColor="#f87515"
                onHandleColor="#fff"
                handleDiameter={22}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={45}
                className="react-switch float-right"
                id="recave-button"
              />
            </Label>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={6} md={6}>
            <FormGroup className="mb-0">
              <Label for="maxPlayers" className="selection">1. Max Players</Label>
              <Input
                type="text"
                onKeyPress={this.isInputNumber}
                name="maxPlayers"
                id="maxPlayers"
                className="parameters-inputs dropdown"
                onChange={this.changeMaxPlayers}
                placeholder={this.state.placeholder}
                onClick={this.changeMaxPlayers}
              />
            </FormGroup>
            <p className="selection">2. Minimum Chip</p>
            <Dropdown  size="sm" isOpen={this.state.dropdownOpenMinChip} toggle={this.toggleMinChipInput}>
              <DropdownToggle caret className="parameters-inputs">
                {this.props.minChip}
              </DropdownToggle>
              <DropdownMenu>
                {this.state.minChipOptions.map((chip, index) => {
                  return <DropdownItem key={index} value={chip} onClick={this.handleGenerateStacks}>{chip}</DropdownItem>
                })}
              </DropdownMenu>
            </Dropdown>
            <p className="selection mt-2">3. Starting Stack</p>
            <Dropdown size="sm" isOpen={this.state.dropdownOpenStartingStack} toggle={this.toggleStartingStackInput}>
              <DropdownToggle caret className="parameters-inputs">
                {this.props.startingStack}
              </DropdownToggle>
              <DropdownMenu modifiers={{ setMaxHeight: { enabled: true, order: 890,
                fn: (data) => {
                  return {...data, styles: {...data.styles, overflow: 'auto', maxHeight: 100, },
                      };
                    },
                  },
                }}>
                {this.props.possibleStack.map((stack, index) => {
                  return <DropdownItem key={index} value={stack} onClick={this.handleChangeChips}>{stack}</DropdownItem>
                })}
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col xs={6} md={6} id="disabled">
            <FormGroup className="mb-0">
              <Label for="maxRebuys" className="selection">4. Max Rebuys</Label>
              <Input 
                className={`${this.state.checkedRecave ? "parameters-inputs" : "recave-false"} dropdown`}
                type="text"
                onKeyPress={this.isInputNumber}
                name="maxRebuys"
                id="maxRebuys"
                onChange={this.handleChangeMaxRebuys}
                value={this.state.checkedRecave ? this.state.maxRebuys : 0}
                disabled={this.state.checkedRecave ? false : true}
                onClick={this.handleChangeMaxRebuysValue}
              />
            </FormGroup>
            <FormGroup className="mb-0">
              <Label for="maxAddons" className="selection">5. Max Addons</Label>
              <Input 
                className={`${this.state.checkedRecave ? "parameters-inputs" : "recave-false"} dropdown`}
                type="text"
                onKeyPress={this.isInputNumber}
                name="maxAddons"
                id="maxAddons"
                onChange={this.handleChangeMaxAddons}
                value={this.state.checkedRecave ? this.state.maxAddons : 0}
                disabled={this.state.checkedRecave ? false : true}
                onClick={this.handleChangeMaxAddonsValue}
              />
            </FormGroup>
            <FormGroup className="mb-0">
              <Label for="AddonsChip" className="selection">6. Addons Chip</Label>
              <Input
                className={`${this.state.checkedRecave ? "parameters-inputs" : "recave-false"} dropdown`}
                type="text"
                onKeyPress={this.isInputNumber}
                name="addonsChips"
                id="addonsChips"
                onChange={this.handleChangeAddonsChips}
                value={this.state.checkedRecave ? this.state.addonsChips : 0}
                disabled={this.state.checkedRecave ? false : true}
                onClick={this.handleChangeAddonsChipsValue}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="w-100">
          <Col md={12} className="p-0 text-center">
            <h6 className="player-stack ml-4 mt-5 mb-4">STARTING STACK PER PLAYER</h6>
          </Col>
        </Row>
        <Table dark size="sm">
          <thead>
            <tr>
              <th>Chip Value</th>
              <th>Qty per player</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.chipOne}</td>
              <td>{this.props.nbrChipOne}</td>
              <td>{this.props.chipOne * this.props.nbrChipOne}</td>
            </tr>
            <tr>
              <td>{this.props.chipTwo}</td>
              <td>{this.props.nbrChipTwo}</td>
              <td>{this.props.chipTwo * this.props.nbrChipTwo}</td>
            </tr>
            <tr>
              <td>{this.props.chipThree}</td>
              <td>{this.props.nbrChipThree}</td>
              <td>{this.props.chipThree * this.props.nbrChipThree}</td>
            </tr>
            <tr>
              <td>{this.props.chipFour}</td>
              <td>{this.props.nbrChipFour}</td>
              <td>{this.props.chipFour * this.props.nbrChipFour}</td>
            </tr>
            <tr>
              <td>{this.props.chipFive}</td>
              <td>{this.props.nbrChipFive}</td>
              <td>{this.props.chipFive * this.props.nbrChipFive}</td>
            </tr>
            <tr>
              <td>Totals</td>
              <td>{totalChipsPerPlayer(this.props)}</td>
              <td>{this.props.startingStack}</td>
            </tr>
          </tbody>
        </Table>
        <Row className="mt-3">
          <Col xs={4} md={4}>
            <Button size="sm" className="quantity-btn" onClick={this.props.handleClickLessChips}>Less Chips</Button>
          </Col>
          <Col xs={4} md={4}>
            <h5 className="totalChips">TOTAL CHIPS : {this.totalChipset(this.props)}</h5>
          </Col>
          <Col xs={4} md={4}>
            <Button size="sm" className="quantity-btn" onClick={this.props.handleClickMoreChips}>More Chips</Button>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="d-flex justify-content-center mt-3">
            <Button className="d-none d-lg-block chipset-btn" onClick={this.toggleModal}>SAMPLE PRICING</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={`modal-sm modal-border p-0 ${this.props.className}`}>
              <ModalBody className="modal-core">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.toggleModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <p className="text-uppercase prices"> Sample Prices</p>
                <Row className="sample-price h-100">
                  <Col md={12} className="d-flex justify-content-between">
                    <p className="text-left">Low quality<br/><em>Plastic Chips</em></p>
                    <p><strong>{Math.floor(this.totalChipset(this.props) / 25 * 3.20)} €</strong></p>
                  </Col>
                  <Col md={12} className="d-flex justify-content-between">
                    <p className="text-left">Medium<br/><em>Clay Composite</em></p>
                    <p><strong>{Math.floor(this.totalChipset(this.props) / 25 * 5.60)} €</strong></p>
                  </Col>
                  <Col md={12} className="d-flex justify-content-between">
                    <p className="text-left">High<br/><em>Clay</em></p>
                    <p><strong>{Math.floor(this.totalChipset(this.props) / 25 * 6.70)} €</strong></p>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-center pt-3 modal-core">
                <div>
                  <a href="https://www.cartes-production.com/fr/jetons-de-poker-c-12" target="_blank" rel="noopener noreferrer" className="btn text-uppercase" role="button">
                    <img className="text-center cart-icon" src="https://i.ibb.co/zGkdkDK/shopping-cart.png" alt="cart"/>
                  </a>
                </div>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = store =>({
  possibleStack: store.possibleStack,
  minChip: store.settings.minChip,
  startingStack : store.settings.startingStack,
  maxPlayers: store.maxPlayers,
  chipset: store.chipset,
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
  extraRules: store.extraRules
});

const mapActionsToProps = {
  handleChangeMinChip: selectMinChipAction,
  handleGeneratePossibleStacks: generatePossibleStacksAction,
  handleChangeStartingStack: selectStartingStackAction,
  handleGenerateChipset: generateChipsetAction,
  handleChangeMaxPlayers: selectMaxPlayersAction,
  handleClickMoreChips: selectMoreChipsAction,
  handleClickLessChips: selectLessChipsAction,
  setTotalChipset: setTotalChipsetAction, 
  setExtraRules: setExtraRulesAction,
  setRecave: setRecaveAction,
  handleChangeColorMinChip: changeMinchipColorAction
};

export default connect(mapStateToProps, mapActionsToProps)(Parameters);