import React from 'react';
import Model from './model/Model';

test('No moves when model created', () => {
  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});
