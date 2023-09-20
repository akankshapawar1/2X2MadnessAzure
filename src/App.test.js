import React from 'react';
import { render, screen } from '@testing-library/react';
import Model from '/Users/akanksha/Desktop/509/madness/model/Model.js';

//default puzzle to use
import { config_4x4 } from '/Users/akanksha/Desktop/509/madness/model/configs.js';
var actualPuzzle = JSON.parse(JSON.stringify(config_4x4));

var model = new Model(actualPuzzle);

test('No moves when model created', () => {
  expect(model.moveCount).toBe(0)
});
