import { EntityState, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"

export type Media = {
  id: string;
  nsfw: boolean;
  path: string;
  source?: string;
  tags?: string;
}

type MediaState = EntityState<Media>

export const fetchMedia = createAsyncThunk("media/fetchAll", (): Media[] => {
  return [];
})

export const addOneMedia = createAsyncThunk("media/addOne", (values: { image: string, nsfw: boolean, source?: string, tags?: string }): Media => {
  return { id: "test", nsfw: values.nsfw, path: values.image, source: values.source, tags: values.tags };
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

const reducer = slice.reducer
export default reducer

// export const { } = slice.actions

export const {
  selectAll: selectAllMedia,
  selectById: selectMediaById,
  selectEntities: selectMediaEntities,
  selectIds: selectMediaIds,
  selectTotal: selectTotalMedia
} = mediaAdapter.getSelectors((state: { media: MediaState }) => state.media);