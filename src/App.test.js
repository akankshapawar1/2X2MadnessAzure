import React from 'react';
import Model from './model/Model';
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';

test('Properly renders initial screen', ()=>{
  const { getByText } = render(<App />);
  const movesElement = getByText(/Number of moves: 0/i);
  expect(movesElement).toBeInTheDocument();
})

test('Validate default config is 4X4', () => {
  let m = new Model();
  expect(m.currentConfig).toEqual(0)
});

test('No moves when model created', () => {
  let model = new Model();
  expect(model.numMoves).toBe(0)
});

test('Board unsolved when game starts', ()=>{
  //let a = new App()
  let cFlag = App.flag;
  expect(cFlag).toBeFalsy();
});

test('Updates move count on button clicks', () => {
  const { getByText } = render(<App />);

  const canvasElement = screen.getByTestId('canvas');
  const button_counter = screen.getByTestId('button_counter');
  const button_clock = screen.getByTestId('button_clock');
  const button_reset = screen.getByTestId('button_reset');
  /*
  pageX - 339 pageY - 277
  screenX - 339 screenY - 433
  */
  fireEvent.click(canvasElement, { clientX: 339, clientY: 277, screenX: 339, screenY: 433})
  fireEvent.click(button_counter);
  const movesElement = getByText(/Number of moves: 1/i);
  expect(movesElement).toBeInTheDocument();

  fireEvent.click(button_reset);
  const movesElement2 = getByText(/Number of moves: 0/i);
  expect(movesElement2).toBeInTheDocument(); 

  fireEvent.click(canvasElement, { clientX: 339, clientY: 277, screenX: 339, screenY: 433})
  fireEvent.click(button_clock);
  const movesElement3 = getByText(/Number of moves: 1/i);
  expect(movesElement3).toBeInTheDocument();

})

/* test('Config 5X5 loads on button click', ()=>{
  let model = new Model();
  const { getByText } = render(<App />);
  const button_5 = screen.getByTestId('button_5');
  fireEvent.click(button_5);
  expect(model.board.size).toEqual(5);
} )
 */
/* test('All squares white, should return True', () => {
  const groupArr = [
    { color: 'white' },
    { color: 'white' },
    { color: 'white' },
    { color: 'white' }
  ];
  expect(areAllSquaresEmpty(groupArr)).toBe(true);
}); */  