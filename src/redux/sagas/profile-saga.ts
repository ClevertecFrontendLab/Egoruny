import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';

import { Path } from '../../utils/constans/url';
import { push } from 'redux-first-history';
import { jwtSelect, tarifSelect } from '@redux/slise/select';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import {
    getProfileStart,
    setProfile,
    putProfileStart,
    putProfileError,
    putProfileSaccses,
} from '@redux/slise/profile-slice';

import {
    getTariffsStart,
    getTariffsSuccces,
    postTarifStart,
    postTarifError,
    setTarifId,
    postTarifSuccess,
} from '@redux/slise/tariff-slice';

function* getUserWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const localStorageJwt: string = yield localStorage.getItem('jwt');
    const headers = {
        Authorization: `Bearer ${jwt || localStorageJwt}`,
    };
    try {
        const { data } = yield call(instance.get, AxiosPaths.CURRENT_USER, { headers });
        yield put(setProfile(data));
    } catch (error) {
        // yield put(push(Path.Login));
    }
}
function* putUserWorker({ payload: body }) {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const { data } = yield call(instance.put, AxiosPaths.USER, { ...body }, { headers });
        yield put(setProfile(data));
        yield put(putProfileSaccses(true));
    } catch (error) {
        yield put(putProfileError(true));
    }
}

function* getTariffsWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const { data } = yield call(instance.get, AxiosPaths.TARIFF_CATALOGS, { headers });
        yield put(getTariffsSuccces(data));
        yield put(setTarifId(data[0]._id));
        yield put(push(Path.Settings));
    } catch (error) {
        yield put(push(Path.Settings));
    }
}

function* postTarifWorker() {
    const body = yield select(tarifSelect);
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        yield call(instance.post, AxiosPaths.TARIFF, { ...body }, { headers });
        yield put(postTarifSuccess());
    } catch (error) {
        postTarifError();
    }
}

export function* profileSagaWother() {
    yield takeLatest(getProfileStart.type, getUserWorker);
    yield takeLatest(putProfileStart.type, putUserWorker);
    yield takeLatest(getTariffsStart.type, getTariffsWorker);
    yield takeLatest(postTarifStart.type, postTarifWorker);
}
