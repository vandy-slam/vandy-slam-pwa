import React, { Component } from 'react';
import { ScatterplotChart, ToolTip } from 'react-easy-chart';
import './App.css';

const bigData = [
  {
    type: 'Wall',
    x: 1,
    y: 5
  },
  {
    type: 'Wall',
    x: 3,
    y: 1
  },
  {
    type: 'Wall',
    x: 0,
    y: 6
  },
  {
    type: 'Exit',
    x: 5,
    y: 2
  },
  {
    type: 'Exit',
    x: 4,
    y: 4
  },
  {
    type: 'Bathroom',
    x: 5,
    y: 9
  },
  {
    type: 'Wall',
    x: 9,
    y: 1
  },
  {
    type: 'Wall',
    x: 5,
    y: 6
  },
  {
    type: 'Wall',
    x: 3,
    y: 9
  },
  {
    type: 'Exit',
    x: 7,
    y: 9
  }
];

const config = [
  {
    type: 'Wall',
    color: '#000000',
    stroke: 'black'
  },
  {
    type: 'Exit',
    color: '#ff0000',
    stroke: 'red'
  },
  {
    type: 'Bathroom',
    color: '#00ff00',
    stroke: 'green'
  }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.onFloorChange = this.onFloorChange.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.state = {
      floor: 1,
      dataDisplay: '',
      showToolTip: false,
      randomDataIntervalId: null,
      windowWidth: 400,
      componentWidth: 1000
    };

  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x
    });
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({ top: `${e.y - 10}px`, left: `${e.x + 10}px` });
    }
  }

  mouseOutHandler() {
    this.setState({ showToolTip: false });
  }

  clickHandler(d) {
    this.setState({ dataDisplay: `The amount selected is ${d.y}` });
  }

  onFloorChange(f) {
    this.setState({floor: f});
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          The x value is {this.state.x} and the y value is {this.state.y}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    return (
      <div className="App">
        <div className="headerInfo">
          <h1>Where are you?</h1>
          <p>What floor are you on?</p>
            <select value={this.state.floor} onChange={this.onFloorChange}>
              <option value={0}>Basement</option>
              <option value={1}>Floor 1</option>
              <option value={2}>Floor 2</option>
              <option value={3}>Floor 3</option>              
            </select>
        </div>
        <div className="map">
          <h2>Floor {this.state.floor}</h2>
          <ScatterplotChart
            data={bigData}
            config={config}
            axisLabels={{ x: 'X variable', y: 'Y Variable' }}
            dotRadius={6}
            width={480}
            height={270}
            grid
            mouseOverHandler={this.mouseOverHandler}
            mouseOutHandler={this.mouseOutHandler}
            mouseMoveHandler={this.mouseMoveHandler}
            clickHandler={this.clickHandler.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
