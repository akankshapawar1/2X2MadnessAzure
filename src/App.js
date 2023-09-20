import './App.css';
import { layout } from './Layout.js';
import React from 'react';

function App() {

  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  return (
    <main style={layout.Appmain} ref={appRef}>
        <canvas tabIndex="1"
          className="App-canvas"
          ref={canvasRef}
          width={layout.canvas.width}
          height={layout.canvas.height}
        />
        <label style={layout.text}>Number of moves: </label>
        <div style={layout.buttons}>
          <button style={layout.anti}>Anti</button>
          <button style={layout.clock}>Clock</button>
          <button style={layout.reset}>Reset</button>
          <button style={layout.quit}>Quit</button>
          <button style={layout.one}>4X4</button>
          <button style={layout.two}>5X5</button>
          <button style={layout.three}>6X6</button>
        </div>
    </main>
  );
}

export default App;
