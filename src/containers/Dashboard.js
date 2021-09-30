import React, {useState, useEffect, useReducer} from 'react';

import Card from '../components/card';
import Header from '../components/header';
import Body from '../components/body';
import Filter from '../components/filter';

import serverInformationReducer from '../reducers/serverInformationReducer';

import {SERVER_INFORMATION_ACTIONS} from '../actions';

import '../css/dashboard.css';

const initialState = {
  serverInformation: [],
  dropdownOptions: [],
  filteredServerInformation: [],
  loading: false,
  error: null
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(serverInformationReducer, initialState);
  const [currentDropdownValue, setCurrentDropdownValue] = useState('');

  const {
    serverInformation,
    loading,
    dropdownOptions,
    filteredServerInformation
  } = state;


  useEffect(() => {
    dispatch({type: SERVER_INFORMATION_ACTIONS.CALL_API});
    fetch('http://localhost:3000/devices')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          dispatch({type: SERVER_INFORMATION_ACTIONS.SUCCESS, data: data});
        })
        .catch((error) => {
          dispatch({type: SERVER_INFORMATION_ACTIONS.ERROR, error: error});
        });
  }, []);

  const handleSelect = (event) => {
    const dropdownValue = event.target.value;
    setCurrentDropdownValue(dropdownValue);

    const newData = dropdownValue !== '' ?
      serverInformation.filter(
          (serverInfo) => serverInfo.type === dropdownValue) :
      serverInformation;

    dispatch({type: SERVER_INFORMATION_ACTIONS.UPDATE, data: newData});
  };

  return (
    <div className='container'>
      <Header>Server Information Dashboard</Header>
      <div className='filter-sort-container'>
        <Filter
          handleSelect={handleSelect}
          defaultOption='Search by System Type'
          options={dropdownOptions}
          currentValue={currentDropdownValue}
        />
      </div>
      <Body>
        {
          loading ?
            'Loading...' :
            filteredServerInformation.map((serverInfo) =>
              <Card
                key={serverInfo.id}
                id={serverInfo.id}
                title={`System name: ${serverInfo.system_name}`}
                subTitle={`System type: ${serverInfo.type}`}
                metaData={`Size: ${serverInfo.hdd_capacity} GB`}
              />)
        }
      </Body>
    </div>
  );
};

export default Dashboard;
