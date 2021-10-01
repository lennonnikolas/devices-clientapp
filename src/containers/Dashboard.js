/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';

import Card from '../components/card';
import Header from '../components/header';
import Body from '../components/body';
import Filter from '../components/filter';
import Sort from '../components/sort';

import {MODAL_ACTIONS, SERVER_INFORMATION_ACTIONS} from '../actions';
import {SORT_OPTIONS} from '../constants';

import '../css/dashboard.css';
import {useDashboardContext} from '../contexts/DashboardContext';

const Dashboard = () => {
  const {
    serverInformationState,
    serverInformationDispatch,
    modalDispatch
  } = useDashboardContext();

  const {
    serverInformation,
    loading,
    filterDropdownOptions,
    filteredServerInformation
  } = serverInformationState;

  const [currentFilterDropdownValue, setFilterDropdownValue] = useState('');
  const [currentSortDropdownValue, setSortDropdownValue] = useState('');

  useEffect(() => {
    serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.CALL_API});
    fetch('http://localhost:3000/devices')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.SUCCESS, data: data});
        })
        .catch((error) => {
          serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.ERROR, error: error});
        });
  }, [serverInformationDispatch]);

  const handleSelect = (event) => {
    const dropdownValue = event.target.value;
    setFilterDropdownValue(dropdownValue);

    const newData = dropdownValue !== '' ?
      serverInformation.filter(
          (serverInfo) => serverInfo.type === dropdownValue) :
      serverInformation;

    serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.UPDATE, data: newData});
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

  const handleCardButtonClick = (event, cardData, modalType) => {
    event.preventDefault();
    modalDispatch({type: MODAL_ACTIONS.SHOW_MODAL, data: {modalData: cardData, modalType: modalType}});
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
        <button onClick={(event) => handleCardButtonClick(event, null, 'Add')}>Add Server</button>
      </div>
      <Body>
        {
          loading ?
            'Loading...' :
            filteredServerInformation.map((serverInfo) =>
              <Card
                key={serverInfo.id}
                id={serverInfo.id}
                title={serverInfo.system_name}
                subTitle={serverInfo.type}
                metaData={serverInfo.hdd_capacity}
                onDelete={handleCardButtonClick}
                onUpdate={handleCardButtonClick}
              />)
        }
      </Body>
    </div>
  );
};

export default Dashboard;
