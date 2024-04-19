import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import AuthReducer from './slise/auth-slise';
import feedbacksSlise from './slise/feedbacks-slise';
import postFeedbacSlice from './slise/post-feedbakc-slise';
import traningListSlise from './slise/traningList-slise';
import traningCatalogsSlise from './slise/traning-catalogs-slise';
import treningModalsSlice from './slise/trening-modals-slice';
import createTraningSlice from './slise/create-traning-slice';
import updateTreningSlice from './slise/update-trening-slice';
import appSlise from './slise/app-slice';
import profileSlice from './slise/profile-slice';
import tariffSlice from './slise/tariff-slice';
import myTreningsSlice from './slise/my-trenings-slice';
import joinTreningSlice from './slise/join-trening-slice';
import invateSlice from './slise/invite-slice';
import joinTeningRequestsSlice from './slise/join-tening-requests-slice';
import sendRequestSlice from './slise/send-request-slice';
import cansleTreningSlise from './slise/cansle-trening-slise';
import createMyTreningSlice from './slise/create-my-trening-slice';
import updateMyTreningSlice from './slise/update-my-trening-slice';
import achievementSlice from './slise/achievement-slice';
import { runSaga } from './index';

const sagaMiddleware = createSagaMiddleware();

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 1,
});

export const store = configureStore({
    reducer: combineReducers({
        app: appSlise,
        auth: AuthReducer,
        feedBack: feedbacksSlise,
        postFeedbakc: postFeedbacSlice,
        traningList: traningListSlise,
        traningCatalogs: traningCatalogsSlise,
        treningModals: treningModalsSlice,
        createTraning: createTraningSlice,
        updateTrening: updateTreningSlice,
        profile: profileSlice,
        tarif: tariffSlice,
        myTrenings: myTreningsSlice,
        createMyTrening: createMyTreningSlice,
        updateMyTrening: updateMyTreningSlice,
        joinTrening: joinTreningSlice,
        invate: invateSlice,
        joinTeningRequests: joinTeningRequestsSlice,
        sendRequest: sendRequestSlice,
        cansleTrening: cansleTreningSlise,
        achievement: achievementSlice,
        router: routerReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware).concat(routerMiddleware),
});
sagaMiddleware.run(runSaga);

export const history = createReduxHistory(store);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
