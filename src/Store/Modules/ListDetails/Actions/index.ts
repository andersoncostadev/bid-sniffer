import {IGlobalStoreId} from '../Types';

export default function setNewStoreID(storeId: IGlobalStoreId) {
  return {
      type: 'SET',
      payload: storeId,
    };
  }
