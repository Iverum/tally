import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import databaseReducer from "./db/slice";
import mediaReducer from "./modules/media/slice";

const store = configureStore({
  reducer: {
    database: databaseReducer,
    media: mediaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
export type RootState = ReturnType<typeof store.getState>

export default store;
