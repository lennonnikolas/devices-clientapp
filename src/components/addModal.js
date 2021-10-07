/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {useInputHook} from '../hooks/useInputHook';
import {useDashboardContext} from '../contexts/DashboardContext';
import {trimMetaData, blockInvalidChar} from '../utils';
import {MODAL_ACTIONS, SERVER_INFORMATION_ACTIONS} from '../actions';
import {SYSTEM_NAMES} from '../constants';

import '../css/modal.css';

const AddModal = ({onClose}) => {
  const [currentDropdownValue, setDropdownValue] = useState('');
  const [errors, setErrors] = useState({name: '', message: ''});

  const {values, handleChange} = useInputHook(
      {
        title: '',
        metadata: ''
      }
  );

  const {
    serverInformationDispatch,
    modalDispatch
  } = useDashboardContext();

  const addCard = () => {
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

    fetch('http://localhost:3000/devices',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newUpdateData)
        })
        .then((response) => response.json())
        .then((data) => serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.ADD, data: data}));

    modalDispatch({type: MODAL_ACTIONS.CLOSE_MODAL});
  };

  const handleDropdownSelect = (event) => {
    setDropdownValue(event.target.value);
  };

  return (
    <section className='modal-main'>
      <div className='modal-content'>
        <div className='modal-title-input-area'>
          <div>System Name: </div>
          <input required type='text' name='title' value={values.title} onChange={handleChange} />
          {errors.name === 'title' ? <span>{errors.message}</span> : null}
        </div>
        <div className='modal-subtitle-input-area'>
          <div>System Type: </div>
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
          {errors.name === 'type' ? <span>{errors.message}</span>: null}
        </div>
        <div className='modal-metadata-input-area'>
          <div>System HDD : </div>
          <input required type='number' min='0' name='metadata' onKeyDown={blockInvalidChar} value={values.metadata} onChange={handleChange} />
          {errors.name === 'hdd_capacity' ? <span>{errors.message}</span> : null}
        </div>
      </div>
      <button type='button' onClick={addCard}>
        Add
      </button>
      <button type='button' onClick={onClose}>
        Close
      </button>
    </section>
  );
};

export default AddModal;
