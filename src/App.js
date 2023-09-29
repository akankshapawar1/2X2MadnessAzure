import './App.css';
import { layout } from './Layout.js';
import React from 'react';
import redrawCanvas from './boundary/Boundary';
import Model from './model/Model.js';
import { processClick }  from './controller/SelectController.js';
import { resetHandler } from './controller/ResetController';
import counterClockController from './controller/CounterClockController';
import clockController from './controller/ClockController';

function App() {

  // initial instantiation of the model
  const [model, setModel] = React.useState(new Model(0));
  const [redraw, forceRedraw] = React.useState(0);
  const [selectedGroups, setSelectedGroups] = React.useState([]);

  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  let grpArr

  // ensures initial rendering is performed, and that whenever model changes, it is re-rendered
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  },[model, redraw, selectedGroups])// 2nd arg tells when to refresh
  

  const handleClick = (e) =>{
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;
    console.log("x: " + x, " y: " + y);

    //processClick(model, canvasRef.current, x, y);
    grpArr = processClick(model, canvasRef.current, x, y);
    
    console.log("grpArr:", grpArr, "Type:", typeof grpArr);

    // when 'setSelectedGroups(grpArr)' here, the first circle had to be clicked twice to get selected
    //setSelectedGroups(grpArr)
    //forceRedraw(redraw+1)
  }

  const resetClick = (e) => {
    resetHandler(model, canvasRef.current, appRef.current);
  }

  const callCounter = () =>{
    if(grpArr){
    counterClockController(grpArr)
    console.log("CounterClockwise")
    model.updateMoveCount(+1);
    setSelectedGroups([...grpArr])}
  }

  const callClock = () =>{
    if(grpArr){
    clockController(grpArr)
    console.log("Clockwise")
    model.updateMoveCount(+1);
    setSelectedGroups([...grpArr])}
  }

  return (
      <main style={layout.Appmain} ref={appRef}>
        <canvas tabIndex="1"
          className="App-canvas"
          ref={canvasRef}
          width={layout.canvas.width}
          height={layout.canvas.height}
          onClick = {handleClick}
        />
        <div style={layout.button}>
        <label style={layout.text}>{"Number of moves: "+model.numMoves}</label>
          <button style={layout.anti} onClick={callCounter}>Counter</button>
          <button style={layout.clock} onClick={callClock}>Clock</button>
          <button style={layout.reset} onClick={resetClick}>Reset</button>
          <button style={layout.quit}>Quit</button>
          <button style={layout.one} onClick={() => setModel(new Model(0))}>4X4</button>
          <button style={layout.two} onClick={() => setModel(new Model(1))}>5X5</button>
          <button style={layout.three} onClick={() => setModel(new Model(2))}>6X6</button>
    </div>
    </main>
  );
}

export default App;