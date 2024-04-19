import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    getAchievementTreningLoad: false,
    getAchievementTreningSuccess: false,
    getAchievementTreningError: false,
    getAchievementTreningCatalog: false,
};

const achievementSlise = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
        getAchievementTreningStart(state) {
            state.getAchievementTreningError = false;
            state.getAchievementTreningLoad = true;
        },
        getAchievementTreningSuccess(state) {
            state.getAchievementTreningLoad = false;
        },
        getAchievementTreningError(state) {
            state.getAchievementTreningLoad = false;
            state.getAchievementTreningError = true;
        },
        getAchievementTreningCatalogStart(state) {
            state.getAchievementTreningCatalog = true;
        },
    },
});

export const {
    getAchievementTreningStart,
    getAchievementTreningSuccess,
    getAchievementTreningError,
    getAchievementTreningCatalogStart,
} = achievementSlise.actions;

export default achievementSlise.reducer;
