// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import codeReducer from "./code/codeSlice";
import settingsReducer from "./settings/settingsSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const codePersistConfig = {
  key: "code",
  storage,
};

const settingsPersistConfig = {
  key: "settings",
  storage,
};

const rootReducer = combineReducers({
  code: persistReducer(codePersistConfig, codeReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      devTools: true,
    }),
});

export const persistor = persistStore(store);
