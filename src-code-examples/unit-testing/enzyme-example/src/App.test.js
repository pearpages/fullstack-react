import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', function () {
  it(`should have the 'th' "Items"`, function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.contains(<th>Items</th>)).toBe(true);
  });
});