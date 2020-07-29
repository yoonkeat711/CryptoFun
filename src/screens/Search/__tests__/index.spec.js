import Search from '../index';
import renderer from 'react-test-renderer';
import React from 'react';
import CryptoCell from '../components/CryptoCell';

test('renders correctly', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders CryptoCell correctly', () => {
  const renderTree = renderer.create(<CryptoCell symbol={"BTC"} name={"Bitcoin"} index={1} />);
  const renderInstance = renderTree.root;
  console.log(renderInstance);
});
