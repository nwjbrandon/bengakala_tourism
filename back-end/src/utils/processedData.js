import _ from 'lodash';

export const processedDataToChangeInDB = ({ receivedData, existingUUID }) => {
  const receivedUUID = _.keys(receivedData);
  const deleteUUID = _.differenceWith(existingUUID, receivedUUID, _.isEqual);
  const saveUUID = _.differenceWith(receivedUUID, existingUUID, _.isEqual);
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
