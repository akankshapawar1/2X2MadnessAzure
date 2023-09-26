import React from 'react';
import Model from './model/Model';

test('First conf', () => {
  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});
