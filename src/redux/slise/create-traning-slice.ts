import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoad: false,
    error: false,
};

const createTreningSlice = createSlice({
    name: 'createTraning',
    initialState,
    reducers: {
        postCreateTreningStart(state) {
            state.isLoad = true;
            state.error = false;
        },
        postCreateTreningSuccess(state) {
            state.isLoad = false;
        },
        postCreateTreningError(state) {
            state.isLoad = false
            state.error = true
        },
    
    },
});


export const {postCreateTreningStart,postCreateTreningSuccess,postCreateTreningError} = createTreningSlice.actions


export default createTreningSlice.reducer