import React from 'react';

const Sort = ({defaultOption, options, currentValue, handleSort}) => {
  return (
    <div>
      <select
        data-testid='sort-select-element'
        value={currentValue}
        onChange={handleSort}
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

export default Sort;
