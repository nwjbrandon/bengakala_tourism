import _ from 'lodash';
// sort the received data into three list to update, save, and delete against the existing data
export const processedDataToChangeInDB = ({ receivedData, existingUUID }) => {
  const receivedUUID = _.keys(receivedData);
  // list of entries to delete based on uuid
  const deleteUUID = _.differenceWith(existingUUID, receivedUUID, _.isEqual);
  // list of entries to save based on uuid
  const saveUUID = _.differenceWith(receivedUUID, existingUUID, _.isEqual);
  // list of entries to update based on uuid
  const updateUUID = _.intersectionWith(existingUUID, receivedUUID, _.isEqual);
  const deleteList = _.map(deleteUUID, item => _.assign({ uuid: item }));
  const saveList = _.chain(receivedData)
    .map((data, uuid) => {
      if (_.includes(saveUUID, uuid)) {
        return _.assign({ ...data, uuid });
      }
      return null;
    })
    .filter(item => item != null)
    .value();
  const updateList = _.chain(receivedData)
    .map((data, uuid) => {
      if (_.includes(updateUUID, uuid)) {
        return _.assign({ data, params: _.assign({ uuid }) });
      }
      return null;
    })
    .filter(item => item != null)
    .value();
  return { updateList, saveList, deleteList };
};
