import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', function () {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />);
  });

  it(`should have the 'th' "Items"`, function () {
    expect(wrapper.contains(<th>Items</th>)).toBe(true);
  });

  it(`should have a button with "Add Item"`, function () {
    expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(true);
  });

  it('`button` should be disabled', () => {
    const button = wrapper.find('button').first();
    expect(
      button.props().disabled
    ).toBe(true);
  });

  it('should have an `input` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <input />)
    ).toBe(true);
  });

});