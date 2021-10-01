/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

import {MODAL_ACTIONS, SERVER_INFORMATION_ACTIONS} from '../actions';
import {useDashboardContext} from '../contexts/DashboardContext';
import {useInputHook} from '../hooks/useInputHook';
import {trimMetaData} from '../utils';

import '../css/modal.css';

const UpdateModal = ({modalData, onClose}) => {
  const {values, handleChange} = useInputHook(
      {
        title: modalData.title,
        subtitle: modalData.subTitle,
        metadata: trimMetaData(modalData.metaData)
      }
  );

  const {
    serverInformationState,
    serverInformationDispatch,
    modalDispatch
  } = useDashboardContext();

  const updateServerInformationData = (id) => {
    const newData = serverInformationState.serverInformation.map(
        (serverInfo) => serverInfo.id === id ?
          {
            ...serverInfo,
            system_name: values.title,
            type: values.subtitle,
            hdd_capacity:
            values.metadata} :
          serverInfo
    );
    serverInformationDispatch(
        {type: SERVER_INFORMATION_ACTIONS.UPDATE, data: newData}
    );
  };

  const updateCard = () => {
    const newUpdateData = {
      system_name: values.title,
      type: values.subtitle,
      hdd_capacity: trimMetaData(values.metadata)
    };

    fetch(`http://localhost:3000/devices/${modalData.id}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newUpdateData)
        });
    updateServerInformationData(modalData.id);
    modalDispatch({type: MODAL_ACTIONS.CLOSE_MODAL});
  };

  return (
    <section className='modal-main'>
      <div className='modal-content'>
        <div className='modal-title-input-area'>
          <div>System Name: </div>
          <input type='text' name='title' value={values.title} onChange={handleChange} />
        </div>
        <div className='modal-subtitle-input-area'>
          <div>System Type: </div>
          <input type='text' name='subtitle' value={values.subtitle} onChange={handleChange}/>
        </div>
        <div className='modal-metadata-input-area'>
          <div>System HDD : </div>
          <input type='text' name='metadata' value={values.metadata} onChange={handleChange} />
        </div>
      </div>
      <button type='button' onClick={updateCard}>
        Update
      </button>
      <button type='button' onClick={onClose}>
        Close
      </button>
    </section>
  );
};

export default UpdateModal;
