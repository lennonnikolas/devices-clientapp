import React, {useReducer} from 'react';
import Dashboard from '../containers/Dashboard';
import DashboardContext from '../contexts/DashboardContext';

import serverInformationReducer from '../reducers/serverInformationReducer';
import modalReducer from '../reducers/modalReducer';
import Modal from '../containers/Modal';

const serverInformationInitialState = {
  serverInformation: [],
  filterDropdownOptions: [],
  filteredServerInformation: [],
  loading: false,
  error: null
};

const modalInitialState = {
  showModal: false,
  modalType: ''
};

const DashboardProvider = () => {
  const [serverInformationState, serverInformationDispatch] = useReducer(serverInformationReducer, serverInformationInitialState);
  const [modalState, modalDispatch] = useReducer(modalReducer, modalInitialState);

  const providerState = {
    serverInformationState,
    serverInformationDispatch,
    modalState,
    modalDispatch
  };

  return (
    <DashboardContext.Provider value={providerState} >
      <Dashboard />
      <Modal />
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
