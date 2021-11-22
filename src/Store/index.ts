import {createStore, compose, combineReducers} from 'redux';
import GlobalStoreId from './Modules/ListDetails/Reducers';
import GlobalCupons from './Modules/Cupom/Reducers';
import { ICupom } from './Modules/Cupom/Types';
import { IGlobalStoreId } from './Modules/ListDetails/Types';

export interface IRootStore {
  GlobalStoreId: IGlobalStoreId
  GlobalCupons: ICupom
};

const combineStore = combineReducers({
    GlobalStoreId,
    GlobalCupons,
 });

  const store = createStore(combineStore);


export default store;
