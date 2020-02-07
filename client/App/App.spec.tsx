import React from 'react';
import renderer from 'react-test-renderer';

import { App } from './App';

describe('[Component]: App', () => {
  it('should match snapshot', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
