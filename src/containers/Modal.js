import React from 'react';
import {useDashboardContext} from '../contexts/DashboardContext';
import DeleteModal from '../components/deleteModal';
import UpdateModal from '../components/updateModal';
import AddModal from '../components/addModal';

import {MODAL_ACTIONS} from '../actions';

import '../css/modal.css';

const Modal = () => {
  const {
    modalState,
    modalDispatch
  } = useDashboardContext();

  const {
    showModal,
    modalData,
    modalType
  } = modalState;

  const showHideClassName = showModal ?
  'modal display-block' :
  'modal display-none';

  const closeModal = (event) => {
    modalDispatch({type: MODAL_ACTIONS.CLOSE_MODAL});
  };

  const displayModal = (modalData, modalType) => {
    let modalJsx = null;
    switch (modalType) {
      case 'Update':
        modalJsx = <UpdateModal onClose={closeModal} modalData={modalData}/>;
        break;
      case 'Delete':
        modalJsx = <DeleteModal onClose={closeModal} modalData={modalData} />;
        break;
      case 'Add':
        modalJsx = <AddModal onClose={closeModal} />;
        break;
      default:
        break;
    }

    return modalJsx;
  };

  return (
    <div className={showHideClassName}>
      {displayModal(modalData, modalType)}
    </div>
  );
};

export default Modal;
