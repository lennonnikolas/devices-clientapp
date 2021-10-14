import {SORT_OPTIONS} from '../constants';

/* eslint-disable max-len */
export const trimMetaData = (metaData) => {
  if (metaData === undefined) {
    // quick exit
    return;
  }
  // specific use case...
  // use regex to strip all non numeric chars from hdd metadata just in case
  return metaData.replace(/\D/g, '');
};

export const blockInvalidChar = (e) => ['+', '-'].includes(e.key) && e.preventDefault();

export const sortServerInformation = (value, objectToSort) => {
  if (value === SORT_OPTIONS.SYSTEM_NAME) {
    return objectToSort.sort((firstObject, secondObject) => {
      const firstSystemName = firstObject.system_name.toLowerCase();
      const secondSystemName = secondObject.system_name.toLowerCase();

      if (firstSystemName < secondSystemName) {
        return -1;
      } else if (firstSystemName > secondSystemName) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (value === SORT_OPTIONS.HDD_CAPACITY) {
    return objectToSort.sort(
        (firstInfo, secondInfo) =>
          firstInfo.hdd_capacity - secondInfo.hdd_capacity
    );
  } else {
    return;
  }
};
