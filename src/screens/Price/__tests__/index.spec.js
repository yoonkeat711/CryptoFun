import React from 'react';
import Price from './../index';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
  const tree = renderer.create(<Price />).toJSON();
  expect(tree).toMatchSnapshot();
})
