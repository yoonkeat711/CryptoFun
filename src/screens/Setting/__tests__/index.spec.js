import Setting from '../index';
import React from 'react';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Setting />).toJSON();
  expect(tree).toMatchSnapshot();
})
