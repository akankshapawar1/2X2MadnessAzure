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
  const [redraw, forceRedraw] = useState(0);
  const appRef = useRef(null);
  const canvasRef = useRef(null);

  let grpArr
  let flag = false;

  // ensures initial rendering is performed, and that whenever model changes, it is re-rendered
  useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  },[model, redraw])// 2nd arg tells when to refresh
  

  const handleClick = (e) =>{
    const canvasRect = canvasRef.current.getBoundingClientRect();

    //console.log(e);

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;
    //console.log("x: " + x, " y: " + y);

    grpArr = processClick(model, canvasRef.current, x, y, forceRedraw, flag);

  }

  const resetClick = () => {
    resetHandler(model, setModel);
  }

  const callCounter = () =>{
      if(grpArr){
      counterClockController(grpArr)
      //console.log("CounterClockwise ")
      //console.log(JSON.stringify(grpArr))
      forceRedraw(redraw+1);
      model.updateMoveCount(+1);
    }
  }

  const callClock = () =>{
    if(grpArr){
      clockController(grpArr)
      //console.log("Clockwise ")
      //console.log(JSON.stringify(grpArr))
      forceRedraw(redraw+1);
      model.updateMoveCount(+1);
    }
  }

  function isBoardCleared(squares) {
    flag = squares.every(square => square.color === 'white'); 
    return flag;
  }

  return (
      <main style={layout.Appmain} ref={appRef}>
        <canvas tabIndex="1"
          className="App-canvas"
          data-testid="canvas"
          ref={canvasRef}
          width={layout.canvas.width}
          height={layout.canvas.height}
          onClick = {handleClick}
        />
        <div style={layout.button}>
        <label style={layout.text}>{"Number of moves: "+model.numMoves}</label>
          <button style={layout.anti} data-testid="button_counter" onClick={callCounter}>Counter</button>
          <button style={layout.clock} data-testid="button_clock" onClick={callClock}>Clock</button>
          <button style={layout.reset} data-testid="button_reset" onClick={resetClick}>Reset</button>
          <button style={layout.quit}>Quit</button>
          <button style={layout.one} data-testid="button_4" onClick={() => setModel(new Model(0))}>4X4</button>
          <button style={layout.two} data-testid="button_5" onClick={() => setModel(new Model(1))}>5X5</button>
          <button style={layout.three} data-testid="button_6" onClick={() => setModel(new Model(2))}>6X6</button>
          {isBoardCleared(model.board.squares) && <div style={{ color: 'red', fontSize: '24px' }}>Congratulations! You've cleared the board!</div>}
    </div>
    </main>
  );
}

export default App;