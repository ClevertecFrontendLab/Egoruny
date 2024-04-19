import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMyTreningsLoad: false,
    isMyTreningsSuccess: false,
    isMyTreningsError: false,
};

const myTreningsSlice = createSlice({
    name: 'myTrenings',
    initialState,
    reducers: {
        getTreningsStart(state) {
            state.isMyTreningsLoad = true;
            state.isMyTreningsError = false;
        },
        getTreningsSuccess(state) {
            state.isMyTreningsLoad = false;
        },
        getTreningsError(state) {
            state.isMyTreningsLoad = false;
            state.isMyTreningsError = true;
        },
    },
});

export const { getTreningsStart, getTreningsSuccess, getTreningsError } = myTreningsSlice.actions;

export default myTreningsSlice.reducer;
