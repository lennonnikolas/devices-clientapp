/* eslint-disable react/prop-types */
import React from 'react';

const Filter = ({defaultOption, options, currentValue, handleSelect}) => {
  return (
    <div>
      <select
        data-testid='select-element'
        value={currentValue}
        onChange={handleSelect}
      >
        <option value=''>{defaultOption}</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>{option}</option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
