import renderer from 'react-test-renderer';
import Lock from '../index';
import React from 'react';

test('renders correctly', () => {
  const tree = renderer.create(<Lock />).toJSON();
  expect(tree).toMatchSnapshot();
})
