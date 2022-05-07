import lastPlayedReducer from "./lastPlayed";
import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const myReducers = combineReducers({
    lastPlayedReducer: lastPlayedReducer
})


const persistConfig = {
    key: "lastPlayed",
    storage: storage,
    whitelist: ['lastPlayedReducer']
  };

  const persistedReducer = persistReducer(persistConfig, myReducers);

  export const persistedStore = createStore(persistedReducer);
  export const lastPlayedStore = persistStore(persistedStore);

export default myReducers;