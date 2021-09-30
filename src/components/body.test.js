import {render} from '@testing-library/react';
import React from 'react';
import Body from './body';

describe('Body component', () => {
  describe('When the component renders with a body', () => {
    let component;
    beforeEach(() => {
      component = render(
          <Body>This is a body</Body>
      );
    });

    it('Then the body contains text passed to it', () => {
      expect(component.getByText('This is a body')).toBeInTheDocument();
    });
  });
});
