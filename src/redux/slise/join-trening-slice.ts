import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isJoinTreningLoad: false,
    isPartnersSusecc: false,
    isPartnersError: false,
    isJoinsersSusecc: false,
    isJoinsersError: false,
    JoinUsersList: false,
    joinUsers: [],
    treningPartners: [],
    treningType: false,
};

const joinTreningSlice = createSlice({
    name: 'jonTrening',
    initialState,
    reducers: {
        getTreningPartnerStart(state) {
            state.isJoinTreningLoad = true;
            state.isPartnersError = false;
        },
        getTreningPartnerSusecc(state, action) {
            state.isJoinTreningLoad = false;
            state.treningPartners = action.payload;
        },
        getTreningPartnerError(state) {
            state.isJoinTreningLoad = false;
            state.isPartnersError = true;
        },
        getJoinUsersStart(state) {
            state.isJoinTreningLoad = true;
            state.isJoinsersError = false;
        },
        getJoinUsersSusecc(state, action) {
            state.isJoinTreningLoad = false;
            state.isJoinsersError = false;
            state.isPartnersSusecc = true;
            const sortUsers = action.payload.sort((a, b) => a.name.localeCompare(b.name));
            state.joinUsers = sortUsers;
        },
        getJoinUsersError(state) {
            state.isJoinTreningLoad = false;
            state.isJoinsersError = true;
        },
        showJoinUsersList(state, action) {
            state.JoinUsersList = action.payload;
        },
        setTraningType(state, action) {
            state.treningType = action.payload;
        },
        setTreningPartners(state, action) {
            state.treningPartners = action.payload;
        },
        setjoingUsers(state, action) {
            state.joinUsers = [action.payload];
        },
    },
});

export const {
    getTreningPartnerStart,
    getTreningPartnerSusecc,
    getTreningPartnerError,
    getJoinUsersStart,
    getJoinUsersSusecc,
    getJoinUsersError,
    showJoinUsersList,
    setTraningType,
    setTreningPartners,
    setjoingUsers,
} = joinTreningSlice.actions;

export default joinTreningSlice.reducer;
