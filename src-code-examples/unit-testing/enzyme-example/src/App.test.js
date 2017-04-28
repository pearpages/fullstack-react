import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', function () {

  var wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />);
  });

  describe('html is correctly defined', function () {

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

  describe('the user populates the input', function () {

    const item = 'Vancouver';

    beforeEach(function () {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: item }
      })
    });

    it('should update the state property `item`', () => {
      expect(
        wrapper.state().item
      ).toEqual(item);
    });

    it('should enable `button`', () => {
      const button = wrapper.find('button').first();
      expect(
        button.props().disabled
      ).toBe(false);
    });

  });

  describe('and then clears the input', function () {

    beforeEach(() => {
      const input = wrapper.find('input').first();
      input.simulate('change', {
        target: { value: '' }
      })
    });

    it('should disable `button`', () => {
      const button = wrapper.find('button').first();
      expect(
        button.props().disabled
      ).toBe(true);
    });

  });

});