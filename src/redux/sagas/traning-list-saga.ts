import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';
import { Path } from '../../utils/constans/url';
import { push } from 'redux-first-history';
import { jwtSelect } from '@redux/slise/select';
import { isPastDate } from '@utils/constans/getPastDate';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import { setModalStatus, togleModal } from '../slise/trening-modals-slice';
import { CalendarModalStatus } from '../../utils/constans/modal-status';

import {
    setSelectedTraning,
    getTraningListStart,
    getTraningListSaccses,
    getTraningListError,
    setUseruserTraningList,
    addTrening,
    resetCreatedTraining,
} from '@redux/slise/traningList-slise';

import {
    postCreateTreningStart,
    postCreateTreningSuccess,
    postCreateTreningError,
} from '@redux/slise/create-traning-slice';

import {
    getTraningCatalogsStart,
    getTraningCatalogsSaccses,
    getTraningCatalogsError,
} from '@redux/slise/traning-catalogs-slise';

import {
    putUpdateTreningStart,
    putUpdateTreningSaccses,
    putUpdateTreningError,
} from '@redux/slise/update-trening-slice';

import { setModalError } from '../slise/trening-modals-slice';

function* getTraningListWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    try {
        const { data } = yield call(instance.get, AxiosPaths.TRANING, { headers });
        yield put(push(Path.Calendar));
        yield put(setUseruserTraningList(data));
        yield put(getTraningListSaccses());
        yield put(getTraningCatalogsStart());
    } catch (error) {
        yield put(setModalError(true));
        yield put(getTraningListError());
    }
}

function* getTraningCatalogsWorker() {
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        const { data } = yield call(instance.get, AxiosPaths.TRANING_CATALOG, { headers });
        yield put(getTraningCatalogsSaccses(data));
    } catch (error) {
        yield put(getTraningCatalogsError());
    }
}

function* postCreateTraningWorker() {
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const body = yield select((state) => state.traningList.selectedTraning);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        const { data } = yield call(instance.post, AxiosPaths.TRANING, body, { headers });
        yield put(postCreateTreningSuccess());
        yield put(addTrening(data));
        yield put(setModalStatus(CalendarModalStatus.TRAINING));
    } catch (error) {
        yield put(togleModal(false));
        yield put(postCreateTreningError(true));
        yield put(setModalStatus(CalendarModalStatus.TRAINING));
        yield put(resetCreatedTraining());
    }
}

function* putUpdateTraningWorker() {
    const prev = yield select((state) => state.traningList.prevState);
    const date = yield select((state) => state.traningList.selectedDate);
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const body = yield select((state) => state.traningList.selectedTraning);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        const { data } = yield call(instance.put, `${AxiosPaths.TRANING}/${body._id}`, body, {
            headers,
        });

        yield put(setSelectedTraning(data));
        yield put(setModalStatus(CalendarModalStatus.TRAINING));
        yield put(putUpdateTreningSaccses());
        yield put(getTraningListStart());
    } catch (error) {
        yield put(togleModal(false));
        const pastDate = isPastDate(date);
        yield put(putUpdateTreningError(true));
        if (!pastDate) {
            yield put(setSelectedTraning(prev));
        }
    }
}

export function* traningListSagaWother() {
    yield takeLatest(getTraningListStart.type, getTraningListWorker);
    yield takeLatest(getTraningCatalogsStart.type, getTraningCatalogsWorker);
    yield takeLatest(postCreateTreningStart.type, postCreateTraningWorker);
    yield takeLatest(putUpdateTreningStart.type, putUpdateTraningWorker);
}
