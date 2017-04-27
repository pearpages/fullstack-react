import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', function () {
  it(`should have the 'th' "Items"`, function () {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<th>Items</th>)).toBe(true);
  });

  it(`should have a button with "Add Item"`, function () {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(true);
  });

  it('`button` should be disabled', () => {
    const wrapper = shallow(
      <App />);
    const button = wrapper.find('button').first();
    expect(
      button.props().disabled
    ).toBe(true);
  });

  it('should have an `input` element', () => {
    const wrapper = shallow(
      <App />);
    expect(
      wrapper.containsMatchingElement(
        <input />)
    ).toBe(true);
  });

});