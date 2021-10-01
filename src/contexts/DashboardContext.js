import React from 'react';

const DashboardContext = React.createContext();

// eslint-disable-next-line require-jsdoc
export function useDashboardContext() {
  return React.useContext(DashboardContext);
};

export default DashboardContext;
