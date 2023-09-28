import React from 'react';
import Model from './model/Model';
import  processClick  from './controller/SelectController';

test('First conf', () => {
  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});
/* test('Select 0 at start', () => {
  expect(processClick.selectedCircle).toBeTruthy();
}); */
