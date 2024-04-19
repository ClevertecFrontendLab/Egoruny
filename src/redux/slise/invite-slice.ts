import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isJoingTreinLoad: false,
    isInvateLoad: false,
    isInvateSacces: false,
    isInvateError: false,
    createTreningId: '',
    userId: '',
    treningPals: [],
};

const invateSlice = createSlice({
    name: 'Invite',
    initialState,
    reducers: {
        postInviteStart(state) {
            state.isInvateLoad = true;
        },
        postInviteSuccess(state) {
            state.isInvateLoad = false;
        },
        postInviteError(state, action) {
            state.isInvateLoad = false;
            state.isInvateError = action.payload;
        },
        postCreateJoinTraningStart(state) {
            state.isJoingTreinLoad = !state.isJoingTreinLoad;
        },
        setTreningId(state, action) {
            state.createTreningId = action.payload;
        },
        setUserId(state, action) {
            state.userId = action.payload;
        },
    },
});

export const {
    postInviteStart,
    postInviteSuccess,
    postInviteError,
    postCreateJoinTraningStart,
    setTreningId,
    setUserId,
} = invateSlice.actions;

export default invateSlice.reducer;
