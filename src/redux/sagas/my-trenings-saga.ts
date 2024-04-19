import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';

import { Path } from '../../utils/constans/url';
import { push } from 'redux-first-history';
import { jwtSelect, selectedTraningSelect } from '@redux/slise/select';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
    getTreningsStart,
    getTreningsSuccess,
    getTreningsError
} from '@redux/slise/my-trenings-slice';



import {
    setUseruserTraningList,
    addTrening,
    resetCreatedTraining,
} from '@redux/slise/traningList-slise';

import {
    postCreateMyTreningsStart,
    postCreateMyTreningsSuccess,
    postCreateMyTreningsError,
} from '@redux/slise/create-my-trening-slice';


import { putUpdateMyTraningError,putUpdateMyTraningSuccess,putUpdateMyTraningStart } from '@redux/slise/update-my-trening-slice';

import { setModalError } from '@redux/slise/trening-modals-slice';

function* getMyTraningsWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const { data } = yield call(instance.get, AxiosPaths.TRANING, { headers });
        yield put(push(Path.MyTrenings));
        yield put(setUseruserTraningList(data));
        yield put(getTreningsSuccess());
    } catch (error) {
        yield put(setModalError(true));
        yield put(getTreningsError());
    }
}

function* postCreateTraningWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    const body = yield select(selectedTraningSelect);

    try {
        const { data } = yield call(instance.post, AxiosPaths.TRANING, body, { headers });
        yield put(addTrening(data));
        yield put(resetCreatedTraining());
        yield put(postCreateMyTreningsSuccess());
    } catch (error) {
        yield put(postCreateMyTreningsError());
    }
}

function* putUpdateMyTraningWorker() {
    const prev = yield select((state) => state.traningList.prevState);
    const date = yield select((state) => state.traningList.selectedDate);
    const jwt: boolean | string = yield select(jwtSelect);
    const body = yield select((state) => state.traningList.selectedTraning);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    try {
        const { data } = yield call(instance.put, `${AxiosPaths.TRANING}/${body._id}`, body, {
            headers,
        });
        yield put(putUpdateMyTraningSuccess());
        yield put(getTreningsStart());
    } catch (error) {

        yield put(putUpdateMyTraningError());
    }
}

export function* myTraningListSagaWother() {
    yield takeLatest(getTreningsStart.type, getMyTraningsWorker);
    yield takeLatest(postCreateMyTreningsStart.type, postCreateTraningWorker);
    yield takeLatest(putUpdateMyTraningStart.type, putUpdateMyTraningWorker);
}
