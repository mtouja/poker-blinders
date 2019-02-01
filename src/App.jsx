import React, { Component } from 'react';
import './App.css';
import { Button, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import Parameters from './Components/Parameters/Parameters';
import Chipcase from './Components/Chipcase/Chipcase';
import Navigation from './Components/Navigation/Navigation' ;
import ChipsetComponent from './Components/ChipsetComponent/ChipsetComponent';
import Sidebar from 'react-sidebar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sidebarOpen: false
    };
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  render() {
    return (
      <Container fluid={true} className="p-0">
        <Sidebar
          className="d-md-block d-lg-none"
          sidebar={(
            <div className="h-100">
              <ChipsetComponent onSetSidebarOpen={this.onSetSidebarOpen}/>
            </div>
          )}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: '#212632', width: '100%', height: 'auto' } }}
          touch={this.props.enableTouch}
          >
        <Navigation />
        <Row>
          <Col lg={4} md={12} className="p-0">
            <Parameters />
            <div className="text-center">
              <Button className="d-xs-block d-lg-none chipset-btn mb-3" onClick={() => this.onSetSidebarOpen(true)}>
                SAMPLE PRICING
              </Button>
            </div>
          </Col>
          <Col lg={8}>
            <Chipcase />
          </Col>
        </Row>
        </Sidebar>
      </Container>
    );
  }
}

const mapStateToProps = store =>({
  enableTouch: store.enabletouch
})

export default connect (mapStateToProps)(App);
