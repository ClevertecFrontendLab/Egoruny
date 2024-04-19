import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUpdateMyTreningLoad: false,
    isUpdateMyTreningSuccess: false,
    isUpdateMyTreningError: false,
};

const updateMyTreningSlice = createSlice({
    name: 'updateMyTrening',
    initialState,
    reducers: {
        putUpdateMyTraningStart(state) {
            state.isUpdateMyTreningError = false;
            state.isUpdateMyTreningLoad = true;
        },
        putUpdateMyTraningSuccess(state) {
            state.isUpdateMyTreningLoad = false;
            state.isUpdateMyTreningSuccess = true;
        },
        putUpdateMyTraningError(state) {
            state.isUpdateMyTreningLoad = false;
            state.isUpdateMyTreningError = true;
        },
        closeUpdateAlert(state) {
            state.isUpdateMyTreningSuccess = false;
        },
        updateError(state) {
            state.isUpdateMyTreningError = false;
        },
    },
});

export const {
    putUpdateMyTraningStart,
    putUpdateMyTraningSuccess,
    putUpdateMyTraningError,
    closeUpdateAlert,
    updateError,
} = updateMyTreningSlice.actions;

export default updateMyTreningSlice.reducer;
