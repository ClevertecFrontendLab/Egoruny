import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    desctopVersion: false,
};

const appSlise = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDesctopVersion(state, action) {
            state.desctopVersion = action.payload;
        },
    },
});

export const { setDesctopVersion } = appSlise.actions;

export default appSlise.reducer;
