import React from 'react';
import {render} from '@testing-library/react';
import Card from './card';

describe('Card component', () => {
  const props = {
    id: 1,
    title: 'Title',
    subTitle: 'SubTitle',
    metaData: 'MetaData'
  };

  describe('When the component renders', () => {
    let component;
    beforeEach(() => {
      component = render(
          <Card
            title={props.title}
            subTitle={props.subTitle}
            metaData={props.metaData}
            id={props.id} />
      );
    });

    it('Then the card displays a title', () => {
      expect(component.getByText('Title')).toBeInTheDocument();
    });

    it('Then the card displays a subtitle', () => {
      expect(component.getByText('SubTitle')).toBeInTheDocument();
    });

    it('Then the card displays metaData', () => {
      expect(component.getByText('MetaData')).toBeInTheDocument();
    });
  });
});
