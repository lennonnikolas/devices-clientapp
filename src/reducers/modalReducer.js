import {MODAL_ACTIONS} from '../actions';

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
        modalType: action.data.modalType,
        modalData: action.data.modalData
      };
    }
    case MODAL_ACTIONS.CLOSE_MODAL: {
      return {
        ...state,
        showModal: false,
        modalType: '',
        modalData: null
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
