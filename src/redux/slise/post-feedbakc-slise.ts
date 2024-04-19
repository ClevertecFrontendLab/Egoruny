import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPostfeeedbacksLogged: false,
    postfeedbacksError: false,
    postFeedbakcSuccess: false,
};

const postFeedbacSlice = createSlice({
    name: 'postFeedbackSlise',
    initialState,
    reducers: {
        postFeedbacksStart(state) {
            state.isPostfeeedbacksLogged = true;
            state.postfeedbacksError = false;
        },
        postFeedbacksSettingsStart(state) {
            state.isPostfeeedbacksLogged = true;
            state.postfeedbacksError = false;
        },
        postFeedbacksSaccses(state) {
            state.isPostfeeedbacksLogged = false;
            state.postFeedbakcSuccess = !state.postFeedbakcSuccess;
        },
        postFeedbacksError(state, action) {
            state.postfeedbacksError = action.payload;
            state.isPostfeeedbacksLogged = false;
        },
    },
});

export const {
    postFeedbacksStart,
    postFeedbacksSaccses,
    postFeedbacksError,
    postFeedbacksSettingsStart,
} = postFeedbacSlice.actions;

export default postFeedbacSlice.reducer;
