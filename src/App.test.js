import React from 'react';
import Model from './model/Model';
import  {processClick}  from './controller/SelectController';
import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';

test('First conf', () => {
  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});
test('No moves when model created', () => {
  let model = new Model();
  expect(model.numMoves).toBe(0)
});
test('Board solved is false when game starts', ()=>{
  //let a = new App()
  let cFlag = App.flag;
  expect(cFlag).toBeFalsy();
});
/* test('Process click returns something', () => {
  expect(processClick()).toBeDefined();
}); */

test('Properly renders 0 moves', ()=>{
  const { getByText } = render(<App />);
  const movesElement = getByText(/Number of moves: 0/i);
  expect(movesElement).toBeInTheDocument();
})

test('Properly renders 0 moves', ()=>{
  const { getByText } = render(<App />);
  const movesElement = getByText(/Number of moves: 0/i);
  expect(movesElement).toBeInTheDocument();
})