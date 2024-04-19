import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    istraningCatalogsLoad: false,
    traningCatalogs: [],
    traningCatalogsError: false,
};

const traningCatalogsSlise = createSlice({
    name: 'trningCatalog',
    initialState,
    reducers: {
        getTraningCatalogsStart(state) {
            state.istraningCatalogsLoad = true;
            state.traningCatalogsError = false;
        },
        getTraningCatalogsSaccses(state, action) {
            state.istraningCatalogsLoad = false;
            state.traningCatalogs = action.payload;
        },
        getTraningCatalogsError(state) {
            state.istraningCatalogsLoad = false;
            state.traningCatalogsError = true;
        },
    },
});

export const { getTraningCatalogsStart, getTraningCatalogsSaccses, getTraningCatalogsError } =
    traningCatalogsSlise.actions;

export default traningCatalogsSlise.reducer;
