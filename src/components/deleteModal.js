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

    const newServerInformation = serverInformationState.serverInformation.filter((serverInfo) => serverInfo.id !== id);
    const newFilteredServerInformation = serverInformationState.filteredServerInformation.filter((serverInfo) => serverInfo.id !== id);

    serverInformationDispatch(
        {
          type: SERVER_INFORMATION_ACTIONS.DELETE,
          data: {
            serverInformation: newServerInformation,
            filteredServerInformation: newFilteredServerInformation
          }
        }
    );
    modalDispatch({type: MODAL_ACTIONS.CLOSE_MODAL});
  };

  return (
    <section className='modal-main'>
      <h1>Delete System Info</h1>
      <div className='modal-content'>
        <div>System Name: {modalData?.title}</div>
        <div>System Type: {modalData?.subTitle}</div>
        <div>System HDD : {modalData?.metaData}</div>
      </div>
      <div className='modal-action-area'>
        <button className='modal-button' type='button' onClick={deleteCard}>
          Delete
        </button>
        <button className='modal-button' type='button' onClick={onClose}>
          Close
        </button>
      </div>
    </section>
  );
};

export default DeleteModal;
