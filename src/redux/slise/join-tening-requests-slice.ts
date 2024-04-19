import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isjoinTeningRequestsLoad: false,
    isjoinTeningRequestsSucsecc: false,
    isjoinTeningRequestsError: false,
    joinTeningRequests: [],
};

const joinTeningRequests = createSlice({
    name: 'trening-pals',
    initialState,
    reducers: {
        getJoinTeningRequestsStart(state) {
            state.isjoinTeningRequestsLoad = true;
            state.isjoinTeningRequestsError = false;
        },
        getJoinTeningRequestsSucsecc(state, action) {
            state.isjoinTeningRequestsLoad = false;
            state.joinTeningRequests = action.payload;
        },
        getJoinTeningRequestsError(state) {
            state.isjoinTeningRequestsLoad = false;
            state.isjoinTeningRequestsError = true;
        },
    },
});

export const {
    getJoinTeningRequestsStart,
    getJoinTeningRequestsSucsecc,
    getJoinTeningRequestsError,
} = joinTeningRequests.actions;

export default joinTeningRequests.reducer;
