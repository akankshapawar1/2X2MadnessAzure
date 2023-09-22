import './App.css';
import { layout } from './Layout.js';
import React from 'react';
import redrawCanvas from './boundary/Boundary';
import Model from './model/Model.js';
import {processClick}  from './controller/Controller.js';
import { resetHandler } from './controller/ResetController';

// 1. How to display a blank board at the start - Later
// 2. How to pass configurations selected by the user? setModel? - First
// 3. How to select a group? - Second

function App() {
  // initial instantiation of the model
  const [model, setModel] = React.useState(new Model());
  const [redraw, forceRedraw] = React.useState(0);

  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  // ensures initial rendering is performed, and that whenever model changes, it is re-rendered
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  }, [model, redraw])// 2nd arg tells when to refresh

  const handleClick = (e) =>{
    const canvasRect = canvasRef.current.getBoundingClientRect();

    //// normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;
    console.log("Coordinate x: " + x, "Coordinate y: " + y);

    // calls function in controller class
    processClick(model, canvasRef.current, x, y);
  }

  const resetClick = (e) => {
    resetHandler(model, canvasRef.current);
  }


  return (
    /* Commented main to get the x and y co-ordinates. With main, it displayed - 
    DOMRect {x: 0, y: 0, width: 700, height: 700, top: 0, …} for every click
    <main style={layout.Appmain} ref={appRef}
    NONONO Now I get - DOMRect {x: 227.5, y: 0, width: 700, height: 700, top: 0, …}
    fixed it by normailzing points
    */
    //<div className="App">
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
          <button style={layout.one}>4X4</button>
          <button style={layout.two}>5X5</button>
          <button style={layout.three}>6X6</button>
    </div>
    </main>
  );
}

export default App;
