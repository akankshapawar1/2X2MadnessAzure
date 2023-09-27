import './App.css';
import { layout } from './Layout.js';
import React from 'react';
import redrawCanvas from './boundary/Boundary';
import Model from './model/Model.js';
import {processClick}  from './controller/SelectController.js';
import { resetHandler } from './controller/ResetController';

/* 
1. How to display a blank board at the start - Later, is this necessary? - No
2. How to pass configurations selected by the user? setModel? - First - Done
3. How to select a group? - Second - 
   i. Red outline - Done
   ii. Select only one group at a time. If clicked on another, clear previous. - Done
   iii. The red borders get drawn over the circles. Fix it.
4. Reset - We need to pass indication of which config was selected to the controller? Or we can use currentState?
 */
function App() {

  // initial instantiation of the model
  const [model, setModel] = React.useState(new Model(0));
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  // ensures initial rendering is performed, and that whenever model changes, it is re-rendered
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  },[model, redraw])// 2nd arg tells when to refresh
  

  const handleClick = (e) =>{
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;
    console.log("Coordinate x: " + x, "Coordinate y: " + y);

    // calls function in controller class
    processClick(model, canvasRef.current, x, y);
  }

  const resetClick = (e) => {
    resetHandler(model, canvasRef.current, appRef.current);
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
        <label style={layout.text}>Number of moves: </label>
          <button style={layout.anti}>Anti</button>
          <button style={layout.clock}>Clock</button>
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
