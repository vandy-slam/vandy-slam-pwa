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
    type: 'Mens',
    x: 5,
    y: 2
  },
  {
    type: 'Exit',
    x: 4,
    y: 4
  },
  {
    type: 'Womens',
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
    type: 'Womens',
    x: 3,
    y: 9
  },
  {
    type: 'Mens',
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
    type: 'Womens',
    color: '#FF69B4',
    stroke: 'pink'
  },
  {
    type: 'Mens',
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
      floor: 'First Floor',
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
    this.setState({ floor: f.target.value });
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
        <div className="header">
          <p>Rehakt Native Indoor Tracker</p>
        </div>
        <div className="body">
        <div className="headerInfo">
          <h2>What floor are you on?</h2>
          <label>
            <input type="radio" value='Basement' checked={this.state.floor === 'Basement'}
              onChange={this.onFloorChange} />
            Basement
            </label>
          <label>
            <input type="radio" value='First Floor' checked={this.state.floor === 'First Floor'}
              onChange={this.onFloorChange} />
            Floor 1
            </label>
          <label>
            <input type="radio" value='Second Floor' checked={this.state.floor === 'Second Floor'}
              onChange={this.onFloorChange} />
            Floor 2
            </label>
          <label>
            <input type="radio" value='Third Floor' checked={this.state.floor === 'Third Floor'}
              onChange={this.onFloorChange} />
            Floor 3
            </label>
        </div>
        <div className="map">
          <h2>{this.state.floor}</h2>
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
        <div className="footer">
          <p>&copy; 2018 Rehakt Native All Rights Reserved.</p>
        </div>
      </div>
    );
  }
}

export default App;
