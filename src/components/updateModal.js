/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';

import {MODAL_ACTIONS, SERVER_INFORMATION_ACTIONS} from '../actions';
import {useDashboardContext} from '../contexts/DashboardContext';
import {useInputHook} from '../hooks/useInputHook';
import {trimMetaData, blockInvalidChar} from '../utils';
import {SYSTEM_NAMES} from '../constants';

import '../css/modal.css';

const UpdateModal = ({modalData, onClose}) => {
  const [currentDropdownValue, setDropdownValue] = useState(modalData.subTitle);
  const [errors, setErrors] = useState({name: '', message: ''});

  const {values, handleChange} = useInputHook(
      {
        title: modalData.title,
        subtitle: currentDropdownValue,
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
            type: currentDropdownValue,
            hdd_capacity: values.metadata
          } :
          serverInfo
    );
    serverInformationDispatch(
        {type: SERVER_INFORMATION_ACTIONS.UPDATE, data: newData}
    );
  };

  const updateCard = () => {
    const newUpdateData = {
      system_name: values.title,
      type: currentDropdownValue,
      hdd_capacity: trimMetaData(values.metadata)
    };

    if (newUpdateData.system_name === '') {
      setErrors({name: 'title', message: 'Title cannot be empty'});
      return;
    }

    if (newUpdateData.type === '') {
      setErrors({name: 'type', message: 'System type cannot be empty'});
      return;
    }

    if (newUpdateData.hdd_capacity === '') {
      setErrors({name: 'hdd_capacity', message: 'HDD capacity cannot be empty'});
      return;
    }

    fetch(`http://localhost:3000/devices/${modalData.id}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newUpdateData)
        });
    updateServerInformationData(modalData.id);
    modalDispatch({type: MODAL_ACTIONS.CLOSE_MODAL});
  };

  const handleDropdownSelect = (event) => {
    setDropdownValue(event.target.value);
  };

  return (
    <section className='modal-main'>
      <h1>Update System Info</h1>
      <div className='modal-content'>
        <div className='modal-title-input-area'>
          <label className='modal-title'>System Name: </label>
          <input className='modal-input' type='text' name='title' value={values.title} onChange={handleChange} />
          {errors.name === 'title' ? <span className='modal-error'>*{errors.message}</span> : null}
        </div>
        <div className='modal-title-input-area'>
          <label className='modal-title'>System Type: </label>
          <select
            data-testid='add-select-element'
            value={currentDropdownValue}
            onChange={handleDropdownSelect}
          >
            <option value=''>Select Type</option>
            {Object.keys(SYSTEM_NAMES).map((option) => {
              return (
                <option key={option} value={option}>{option}</option>
              );
            })}
          </select>
          {errors.name === 'type' ? <span className='modal-error'>*{errors.message}</span>: null}
        </div>
        <div className='modal-title-input-area'>
          <label className='modal-title'>System HDD: </label>
          <input className='modal-input' required type='number' min='0' name='metadata' onKeyDown={blockInvalidChar} value={values.metadata} onChange={handleChange} />
          {errors.name === 'hdd_capacity' ? <span className='modal-error'>*{errors.message}</span> : null}
        </div>
      </div>
      <div className='modal-action-area'>
        <button className='modal-button' type='button' onClick={updateCard}>
          Update
        </button>
        <button className='modal-button' type='button' onClick={onClose}>
          Close
        </button>
      </div>
    </section>
  );
};

export default UpdateModal;
