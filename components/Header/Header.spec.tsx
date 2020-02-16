import React from 'react';
import renderer from 'react-test-renderer';

import { Header } from './Header';

describe('[Component]: Header', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
