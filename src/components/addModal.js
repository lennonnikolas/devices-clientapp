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
      <h1>Add System Info</h1>
      <div className='modal-content'>
        <div className='modal-title-input-area'>
          <label className='modal-title'>System Name: </label>
          <input className='modal-input' required type='text' name='title' value={values.title} onChange={handleChange} />
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
        <button className='modal-button' type='button' onClick={addCard}>
          Add
        </button>
        <button className='modal-button' type='button' onClick={onClose}>
          Close
        </button>
      </div>
    </section>
  );
};

export default AddModal;
