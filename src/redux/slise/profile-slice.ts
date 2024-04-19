import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

type Profile = {
    profile: null | object;

    isProfileLoad: boolean;
    isProfileSaccses: boolean;
    isProfileError: boolean;
};

const initialState = {
    profile: null,
    isProfileLoad: false,
    isProfileSaccses: false,
    isProfileError: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfileStart(state) {
            state.isProfileLoad = true;
            state.isProfileError = false;
        },
        getProfileSaccses(state) {
            state.isProfileSaccses = true;
            state.isProfileLoad = false;
        },
        getProfileError(state) {
            state.isProfileLoad = false;
            state.isProfileError = true;
        },
        setProfile(state, action) {
            state.profile = action.payload;
        },
        putProfileStart(state) {
            state.isProfileError = false;
            state.isProfileLoad = true;
        },
        putProfileSaccses(state, action) {
            state.isProfileSaccses = action.payload;
            state.isProfileLoad = false;
        },
        putProfileError(state, action) {
            state.isProfileLoad = false;
            state.isProfileError = action.payload;
        },
    },
});

export const {
    getProfileStart,
    getProfileSaccses,
    setProfile,
    putProfileStart,
    getProfileError,
    putProfileError,
    putProfileSaccses,
} = profileSlice.actions;

export default profileSlice.reducer;
