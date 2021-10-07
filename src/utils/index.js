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
