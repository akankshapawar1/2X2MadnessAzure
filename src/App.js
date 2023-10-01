import './App.css';
import { layout } from './Layout.js';
import React, {useEffect, useState, useRef} from 'react';
import redrawCanvas from './boundary/Boundary';
import Model from './model/Model.js';
import { processClick }  from './controller/SelectController.js';
import { resetHandler } from './controller/ResetController';
import counterClockController from './controller/CounterClockController';
import clockController from './controller/ClockController';

function App() {

  const [model, setModel] = useState(new Model(0));
  //const [selectedGroups, setSelectedGroups] = useState([]);
  const [redraw, forceRedraw] = useState(0);
  const [boardCleared, setBoardCleared] = useState(false);
  const appRef = useRef(null);
  const canvasRef = useRef(null);

  let grpArr

  // ensures initial rendering is performed, and that whenever model changes, it is re-rendered
  useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  },[model, redraw])// 2nd arg tells when to refresh
  

  const handleClick = (e) =>{
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;
    //console.log("x: " + x, " y: " + y);


    //grpArr = processClick(model, canvasRef.current, x, y, setSelectedGroups);
    grpArr = processClick(model, canvasRef.current, x, y, forceRedraw);

    //console.log(JSON.stringify(selectedGroups))
  }

  const resetClick = () => {
    resetHandler(model, setModel);
  }

  const callCounter = () =>{
      if(grpArr){
      counterClockController(grpArr)
      console.log("CounterClockwise ")
      //console.log(JSON.stringify(grpArr))
      forceRedraw(redraw+1);
      model.updateMoveCount(+1);
    }
  }

  const callClock = () =>{
    if(grpArr){
      clockController(grpArr)
      console.log("Clockwise ")
      //console.log(JSON.stringify(grpArr))
      forceRedraw(redraw+1);
      model.updateMoveCount(+1);
    }
  }

  function isBoardCleared(squares) {
    return squares.every(square => square.color === 'white'); 
  }

  if (isBoardCleared(model.board.squares)) {
    setBoardCleared(true);
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
          {isBoardCleared(model.board.squares) && <div>Congratulations! You've cleared the board!</div>}
    </div>
    </main>
  );
}

export default App;