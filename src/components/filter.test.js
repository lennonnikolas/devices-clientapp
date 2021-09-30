/* eslint-disable one-var */
import {render} from '@testing-library/react';
import React from 'react';
import Filter from './filter';

describe('Filter component', () => {
  const props = {
    defaultOption: 'Select an option',
    options: ['Test', 'Test 1', 'Test 2'],
    currentValue: 'Test 1',
    handleSelect: jest.fn()
  };

  describe('When the component renders', () => {
    let component, selectElement, dropdownOptions;
    beforeEach(() => {
      component = render(
          <Filter
            defaultOption={props.defaultOption}
            options={props.options}
            currentValue={props.currentValue}
            handleSelect={props.handleSelect}
          />
      );
      selectElement = component.getByTestId('select-element');
      dropdownOptions = selectElement.options;
    });

    it('Then the dropdown has options', () => {
      // very basic but gets the job done temporarily
      expect(dropdownOptions).not.toBeNull();
    });

    // Add unit tests for updating the dropdown value
  });
});
