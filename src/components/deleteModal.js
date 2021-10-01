/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {MODAL_ACTIONS, SERVER_INFORMATION_ACTIONS} from '../actions';
import {useDashboardContext} from '../contexts/DashboardContext';

import '../css/modal.css';

const DeleteModal = ({modalData, onClose}) => {
  const {
    serverInformationState,
    serverInformationDispatch,
    modalDispatch
  } = useDashboardContext();

  const deleteCard = () => {
    const {id} = modalData;

    fetch(`http://localhost:3000/devices/${id}`, {method: 'DELETE'});

    const newServerInformationState = serverInformationState.serverInformation.filter((serverInfo) => serverInfo.id !== id);
    serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.DELETE, data: {serverInformationState: newServerInformationState}});
    modalDispatch({type: MODAL_ACTIONS.CLOSE_MODAL});
  };

  return (
    <section className='modal-main'>
      <div className='modal-content'>
        <div>System Name: {modalData?.title}</div>
        <div>System Type: {modalData?.subTitle}</div>
        <div>System HDD : {modalData?.metaData}</div>
      </div>
      <button type='button' onClick={deleteCard}>
        Delete
      </button>
      <button type='button' onClick={onClose}>
        Close
      </button>
    </section>
  );
};

export default DeleteModal;
