import { EntityState, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { remote } from 'electron'
import fs from "fs";
import md5File from "md5-file";
import path from 'path'

import { Media, MediaAttributes } from "../../db"

type MediaState = EntityState<MediaAttributes>

const { app } = remote
const MEDIA_DIR = path.join(app.getPath('userData'), "media")

export const fetchMedia = createAsyncThunk("media/fetchAll", (): MediaAttributes[] => {
  return [];
})

export const addOneMedia = createAsyncThunk("media/addOne", async (values: { image: string, nsfw: boolean, source?: string, tags?: string }): Promise<MediaAttributes> => {
  const hash = md5File.sync(values.image);
  const extension = path.extname(values.image)
  const linkname = `${path.join(MEDIA_DIR, hash)}${extension}`
  fs.linkSync(values.image, linkname);
  try {
    const newMedia = await Media.create({
      path: linkname,
      nsfw: values.nsfw,
      source: values.source,
    })
    return newMedia.plain();
  } catch (err) {
    fs.unlinkSync(linkname)
    throw err
  }
})

export const mediaAdapter = createEntityAdapter()
const initialState = mediaAdapter.getInitialState({ loading: true })

export const slice = createSlice({
  initialState,
  name: 'media',
  reducers: {
    // removeUser: mediaAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(fetchMedia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMedia.fulfilled, (state, action) => {
      mediaAdapter.upsertMany(state, action.payload);
      state.loading = false;
    })
    builder.addCase(addOneMedia.fulfilled, (state, { payload }) => {
      mediaAdapter.addOne(state, payload)
    })
  }
})

export default slice.reducer

export const {
  selectAll: selectAllMedia,
  selectById: selectMediaById,
  selectEntities: selectMediaEntities,
  selectIds: selectMediaIds,
  selectTotal: selectTotalMedia
} = mediaAdapter.getSelectors((state: { media: MediaState }) => state.media);