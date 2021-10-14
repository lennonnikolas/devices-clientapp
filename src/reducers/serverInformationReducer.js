/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {sortServerInformation} from '../utils';
import {SERVER_INFORMATION_ACTIONS} from '../actions';
import {SORT_OPTIONS} from '../constants';

const serverInformationReducer = (state, action) => {
  switch (action.type) {
    case SERVER_INFORMATION_ACTIONS.CALL_API: {
      return {
        ...state,
        loading: true
      };
    }
    case SERVER_INFORMATION_ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        serverInformation: action.data,
        filteredServerInformation: action.data,
        filterDropdownOptions: [
          // Just as a reminder this removes all duplicates
          ...new Set(action.data.map((serverInfo) => serverInfo.type))
        ]
      };
    }
    case SERVER_INFORMATION_ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    case SERVER_INFORMATION_ACTIONS.SORT: {
      return {
        ...state,
        sortType: action.sortType,
        filteredServerInformation: sortServerInformation(
            action.sortValue, state.filteredServerInformation
        ),
        serverInformation: sortServerInformation(
            action.sortValue, state.serverInformation
        )
      };
    }
    case SERVER_INFORMATION_ACTIONS.FILTER: {
      return {
        ...state,
        filteredServerInformation: action.filterValue !== '' ?
        state.serverInformation.filter(
            (serverInfo) => serverInfo.type === action.filterValue
        ) :
        state.serverInformation
      };
    }
    case SERVER_INFORMATION_ACTIONS.UPDATE: {
      let sortType = '';
      if (state.sortType === 'hdd_capacity') {
        sortType = SORT_OPTIONS.HDD_CAPACITY;
      }

      if (state.sortType === 'system_name') {
        sortType = SORT_OPTIONS.SYSTEM_NAME;
      }

      return {
        ...state,
        serverInformation: state.sortType !== '' ?
          sortServerInformation(sortType, action.newData) :
          action.newData,
        filteredServerInformation: state.sortType !== '' ?
          sortServerInformation(sortType, action.filteredData) :
          action.filteredData
      };
    }
    case SERVER_INFORMATION_ACTIONS.DELETE: {
      return {
        ...state,
        serverInformation: action.data.serverInformation,
        filteredServerInformation: action.data.filteredServerInformation
      };
    }
    case SERVER_INFORMATION_ACTIONS.ADD: {
      // binaryish search for best index to insert at
      // most performant especially when there are tons of records
      // otherwise you can do an O(n) insertion if you know already
      // that the array is already sorted
      const serverInfoIndex = getSortedIndex(state.serverInformation, action.data, state.sortType);
      const filteredServerInfoIndex = getSortedIndex(state.filteredServerInformation, action.data, state.sortType);

      const newArray = insert(state.serverInformation, serverInfoIndex, action.data);
      const newFilteredArray = insert(state.filteredServerInformation, filteredServerInfoIndex, action.data);
      return {
        ...state,
        // an assumption is made below the user wants the new added
        // item sorted in the original array... This doesn't have to be
        // like this, just my choice
        serverInformation: newArray,
        filteredServerInformation: newFilteredArray
      };
    }
    default:
      return state;
  }
};

const getSortedIndex = (array, objToInsert, key) => {
  let low = 0;
  let high = array.length;

  // hacky but gets the job done here
  const value = key === 'hdd_capacity' ? parseInt(objToInsert[key]) : objToInsert[key];

  while (low < high) {
    const mid = (low + high) >>> 1;
    if (value > array[mid][key]) low = mid + 1;
    else high = mid;
  }
  return low;
};

const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
];

export default serverInformationReducer;
