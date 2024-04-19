import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';


import {
    jwtSelect,
    treningUserTypeSelect,
} from '@redux/slise/select';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
    getTreningPartnerStart,
    getTreningPartnerSusecc,
    getTreningPartnerError,
    getJoinUsersStart,
    getJoinUsersSusecc,
    getJoinUsersError,
    showJoinUsersList,
} from '@redux/slise/join-trening-slice';

function* getPartnersWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const { data } = yield call(instance.get, AxiosPaths.TRAINING_PALS, { headers });
        yield put(getTreningPartnerSusecc(data));
    } catch (error) {
        yield put(getTreningPartnerError());
    }
}

function* getJoinUsersWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    const type = yield select(treningUserTypeSelect);

    let url = '';
    if (type) {
        url = `${AxiosPaths.USER_JOINT_TRAINING_LIST}?trainingType=${type}`;
    } else {
        url = AxiosPaths.USER_JOINT_TRAINING_LIST;
    }

    try {
        const { data } = yield call(instance.get, url, { headers });
        yield put(getJoinUsersSusecc(data));
        yield put(showJoinUsersList(true));
    } catch (error) {
        yield put(getJoinUsersError());
    }
}

export function* joinTreningsSagaWother() {
    yield takeLatest(getTreningPartnerStart.type, getPartnersWorker);
    yield takeLatest(getJoinUsersStart.type, getJoinUsersWorker);
}
