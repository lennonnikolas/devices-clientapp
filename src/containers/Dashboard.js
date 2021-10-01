import React, {useState, useEffect, useReducer} from 'react';

import Card from '../components/card';
import Header from '../components/header';
import Body from '../components/body';
import Filter from '../components/filter';
import Sort from '../components/sort';

import serverInformationReducer from '../reducers/serverInformationReducer';

import {SERVER_INFORMATION_ACTIONS} from '../actions';
import {SORT_OPTIONS} from '../constants';

import '../css/dashboard.css';

const initialState = {
  serverInformation: [],
  filterDropdownOptions: [],
  filteredServerInformation: [],
  loading: false,
  error: null
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(serverInformationReducer, initialState);
  const [currentFilterDropdownValue, setFilterDropdownValue] = useState('');
  const [currentSortDropdownValue, setSortDropdownValue] = useState('');

  const {
    serverInformation,
    loading,
    filterDropdownOptions,
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
    setFilterDropdownValue(dropdownValue);

    const newData = dropdownValue !== '' ?
      serverInformation.filter(
          (serverInfo) => serverInfo.type === dropdownValue) :
      serverInformation;

    dispatch({type: SERVER_INFORMATION_ACTIONS.UPDATE, data: newData});
  };

  const handleSort = (event) => {
    const dropdownValue = event.target.value;
    setSortDropdownValue(dropdownValue);

    if (dropdownValue === SORT_OPTIONS.SYSTEM_NAME) {
      serverInformation.sort((firstInfo, secondInfo) => {
        const firstSystemName = firstInfo.system_name.toLowerCase();
        const secondSystemName = secondInfo.system_name.toLowerCase();

        if (firstSystemName < secondSystemName) {
          return -1;
        } else if (firstSystemName > secondSystemName) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (dropdownValue === SORT_OPTIONS.HDD_CAPACITY) {
      serverInformation.sort(
          (firstInfo, secondInfo) =>
            firstInfo.hdd_capacity - secondInfo.hdd_capacity
      );
    }
  };

  return (
    <div className='container'>
      <Header>Server Information Dashboard</Header>
      <div className='filter-sort-container'>
        <Filter
          handleSelect={handleSelect}
          defaultOption='Search by System Type'
          options={filterDropdownOptions}
          currentValue={currentFilterDropdownValue}
        />
        <Sort
          handleSort={handleSort}
          defaultOption='Sort by System Type'
          options={[SORT_OPTIONS.HDD_CAPACITY, SORT_OPTIONS.SYSTEM_NAME]}
          currentValue={currentSortDropdownValue}
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
