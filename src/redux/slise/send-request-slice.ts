import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSendRequestLoad: false,
    isSendRequestSuccess: false,
    isSendRequestError: false,
    showMyPartner: false,
};

const sendRequestSlice = createSlice({
    name: 'SendRequest',
    initialState,
    reducers: {
        putSendRequestStart(state) {
            state.isSendRequestLoad = true;
            state.isSendRequestError = false;
        },
        putSendRequestSuccess(state) {
            state.isSendRequestLoad = true;
        },
        putSendRequestError(state) {
            state.isSendRequestError = true;
            state.isSendRequestSuccess = false;
        },
        setShowMypartner(state, action) {
            state.showMyPartner = action.payload;
        },
    },
});

export const { putSendRequestStart, putSendRequestSuccess, putSendRequestError, setShowMypartner } =
    sendRequestSlice.actions;

export default sendRequestSlice.reducer;
