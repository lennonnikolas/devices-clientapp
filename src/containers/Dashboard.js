/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {useDashboardContext} from '../contexts/DashboardContext';

import Card from '../components/card';
import Header from '../components/header';
import Body from '../components/body';
import Filter from '../components/filter';
import Sort from '../components/sort';

import {MODAL_ACTIONS, SERVER_INFORMATION_ACTIONS} from '../actions';
import {SORT_OPTIONS} from '../constants';

import '../css/dashboard.css';

const Dashboard = () => {
  const {
    serverInformationState,
    serverInformationDispatch,
    modalDispatch
  } = useDashboardContext();

  const {
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
    serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.FILTER, filterValue: dropdownValue});
  };

  const handleSort = (event) => {
    const dropdownValue = event.target.value;
    let sortType = '';
    setSortDropdownValue(dropdownValue);
    if (dropdownValue === 'System Name') {
      sortType = 'system_name';
    }

    if (dropdownValue === 'HDD Capacity') {
      sortType = 'hdd_capacity';
    }

    if (dropdownValue === '') {
      return sortType;
    }

    serverInformationDispatch({type: SERVER_INFORMATION_ACTIONS.SORT, sortType: sortType, sortValue: dropdownValue});
  };

  const handleCardButtonClick = (event, cardData, modalType) => {
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
        <div>
          <button className='add-server-button' onClick={(event) => handleCardButtonClick(event, null, 'Add')}>
            Add Server
          </button>
        </div>
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
