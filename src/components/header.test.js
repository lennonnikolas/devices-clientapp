import React from 'react';
import {render} from '@testing-library/react';
import Header from './header';

describe('Header component', () => {
  describe('When the component renders', () => {
    let component;
    beforeEach(() => {
      component = render(<Header>This is a header</Header>);
    });

    it('Then the header text is displayed', () => {
      expect(component.getByText('This is a header')).toBeInTheDocument();
    });
  });
});
