import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCansleTraningLoad: false,
    isCansleTraningSuccess: false,
    isCansleTraningError: false,
};

const cansleTraningSlice = createSlice({
    name: 'cansleTraning',
    initialState,
    reducers: {
        deleteCansleTraningStart(state) {
            state.isCansleTraningLoad = true;
            state.isCansleTraningError = false;
        },
        deleteCansleTraningSuccess(state) {
            state.isCansleTraningLoad = false;
            state.isCansleTraningSuccess = true;
        },
        deleteCansleTraningError(state) {
            state.isCansleTraningLoad = false;
            state.isCansleTraningError = true;
        },
    },
});

export const { deleteCansleTraningStart, deleteCansleTraningSuccess, deleteCansleTraningError } =
    cansleTraningSlice.actions;

export default cansleTraningSlice.reducer;
