import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import database from "./";

type DatabaseState = {
  ready: boolean;
}

export const initialize = createAsyncThunk("database/initialize", async () => {
  await database.sync();
})

const initialState = { ready: false };

export const slice = createSlice({
  initialState,
  name: "database",
  reducers: {},
  extraReducers: builder => {
    builder.addCase(initialize.pending, state => {
      state.ready = false;
    })
    builder.addCase(initialize.fulfilled, state => {
      state.ready = true;
    })
  }
})

export const selectDatabaseReady = (state: { database: DatabaseState }) => {
  return state.database.ready;
}

export default slice.reducer;