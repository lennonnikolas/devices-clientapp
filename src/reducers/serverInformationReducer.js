import {SERVER_INFORMATION_ACTIONS} from '../actions';

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
    case SERVER_INFORMATION_ACTIONS.SORT:
    case SERVER_INFORMATION_ACTIONS.UPDATE: {
      return {
        ...state,
        filteredServerInformation: action.data
      };
    }
    case SERVER_INFORMATION_ACTIONS.DELETE: {
      return {
        ...state,
        serverInformation: action.data.serverInformationState,
        filteredServerInformation: action.data.serverInformationState
      };
    }
    case SERVER_INFORMATION_ACTIONS.ADD: {
      console.log('action', action);
      return {
        ...state,
        serverInformation: [...state.serverInformation, action.data],
        filteredServerInformation: [...state.serverInformation, action.data]
      };
    }
    default:
      return state;
  }
};

export default serverInformationReducer;
