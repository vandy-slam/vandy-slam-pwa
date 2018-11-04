import React, { Component } from 'react';
import { ScatterplotChart, ToolTip } from 'react-easy-chart';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Array2d from 'array-2d';
import SimpleDialogDemo from './SimpleDialog'
import './App.css';
import 'react-tabs/style/react-tabs.css';

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
  },
  {
    type: 'Exit',
    x: 100,
    y: 100
  },
  {
    type: 'Exit',
    x: 50,
    y: 50
  },
];

let xMax = 0;
let yMax = 0;
 
bigData.forEach(function(elem){
    xMax =(elem.x > xMax) ? xMax = elem.x : xMax;
    yMax = (elem.y > yMax) ? yMax = elem.y : yMax;
});
 
let occupied = new Array2d(xMax, yMax, 0);
 
bigData.forEach(function(elem){
  occupied.set(elem.x,elem.y, 1)
});
 
 
for(let x = 0; x <= xMax; x++){
  for(let y = 0; y <= yMax; y++){
    if(occupied.get(x,y)===0){
      bigData.push({
          type: "Available",
          x: x,
          y: y
      })
    }
  }
}

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
  },
  {
    type: 'Available',
    color: '#ffffff',
    stroke: 'white'
  }
];

class App extends Component {

  constructor(props) {
    super(props);
    
    this.onDialogClose = this.onDialogClose.bind(this);

    this.state = {
      floor: 'First Floor',
      dataDisplay: '',
      pointMap: bigData,
      posToChange: '',
      showToolTip: false,
      randomDataIntervalId: null,
      windowWidth: 400,
      componentWidth: 1000,
      floor1: [],
      floor2: [],
      floor3: []
    };
  }

  clickHandler(d){
    this.child.handleClickOpen();
    this.setState({posToChange: d});
  }
 
  onDialogClose(pos,val){
      let newPoint = {
        type: val,
        x: pos.x,
        y: pos.y
      };
      this.setState({ floor1: this.state.floor1.push(newPoint)});
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

  // loadFloor1Data = () => {
  //   return axios
  //     .get(
  //       `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories`
  //     )
  //     .then(result => {
  //       console.log(result);
  //       this.setState({
  //         floor1: result.data.items
  //       });
  //     })
  //     .catch(error => {
  //       console.error("error: ", error);
  //       this.setState({
  //         // objects cannot be used as a react child
  //         // -> <p>{error}</p> would throw otherwise
  //         error: `${error}`,
  //       });
  //     });
  // };

  // componentDidMount() {
  //   this.loadFloor1Data();
  // }

  render() {
    return (
      <div className="App">
        <div className="header">
          <p>Rehakt Native Indoor Tracker</p>
        </div>
        <div className="body">
          <Tabs>
            <TabList>
              <Tab>Floor 1</Tab>
              <Tab>Floor 2</Tab>
              <Tab>Floor 3</Tab>
            </TabList>
            <TabPanel>
              <h2>First Floor Map</h2>
              <div className="map">          
                <ScatterplotChart
                  data={this.state.floor1}
                  config={config}
                  axes
                  axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
                  height={350}
                  width={900}
                  dotRadius={3}
                  clickHandler={this.clickHandler.bind(this)}
                />
              </div>
            </TabPanel>
          <TabPanel>
            <h2>Second Floor Map</h2>
            <div className="map">          
                <ScatterplotChart
                  data={bigData}
                  config={config}
                  axes
                  verticalGrid
                  grid
                  axisLabels={{ x: 'X variable', y: 'Y Variable' }}
                  height={350}
                  width={900}
                  dotRadius={3}
                  clickHandler={this.clickHandler.bind(this)}
                />
              </div>
          </TabPanel>
          <TabPanel>
            <h2>Third Floor Map</h2>
            <div className="map">          
                <ScatterplotChart
                  data={bigData}
                  config={config}
                  axes
                  verticalGrid
                  grid
                  axisLabels={{ x: 'X variable', y: 'Y Variable' }}
                  height={350}
                  width={900}
                  dotRadius={3}
                  clickHandler={this.clickHandler.bind(this)}
                />
              </div>
          </TabPanel>
          </Tabs>
      </div>
      <div className="footer">
        <p>&nbsp;&copy; 2018 Rehakt Native. All Rights Reserved.</p>
      </div>
      <SimpleDialogDemo pos={this.state.posToChange} onChange={this.onDialogClose} onRef={ref => (this.child = ref)}/>
      </div >
    );
  }
}

export default App;

// render() {
//   return (
//     <div className="App">
//       <div className="header">
//         <p>Rehakt Native Indoor Tracker</p>
//       </div>
//       <div className="body">
//       <h2>{this.state.floor} Map</h2>
//       <div className="headerInfo">          
//         <label>
//           <input type="radio" value='Basement' checked={this.state.floor === 'Basement'}
//             onChange={this.onFloorChange} />
//           Basement
//           </label>
//         <label>
//           <input type="radio" value='First Floor' checked={this.state.floor === 'First Floor'}
//             onChange={this.onFloorChange} />
//           Floor 1
//           </label>
//         <label>
//           <input type="radio" value='Second Floor' checked={this.state.floor === 'Second Floor'}
//             onChange={this.onFloorChange} />
//           Floor 2
//           </label>
//         <label>
//           <input type="radio" value='Third Floor' checked={this.state.floor === 'Third Floor'}
//             onChange={this.onFloorChange} />
//           Floor 3
//           </label>
//       </div>
//       <div className="map">          
//         <ScatterplotChart
//           data={bigData}
//           config={config}
//           axes
//           axisLabels={{ x: 'X variable', y: 'Y Variable' }}
//           height={400}
//           width={800}
//           dotRadius={5}
//           mouseOverHandler={this.mouseOverHandler}
//           mouseOutHandler={this.mouseOutHandler}
//           mouseMoveHandler={this.mouseMoveHandler}
//           clickHandler={this.clickHandler.bind(this)}
//         />
//       </div>
//       </div>
//       <div className="footer">
//         <p>&nbsp;&copy; 2018 Rehakt Native. All Rights Reserved.</p>
//       </div>
//     </div>
//   );
// }
// }

