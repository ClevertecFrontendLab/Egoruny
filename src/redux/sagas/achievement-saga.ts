import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';
import { Path } from '../../utils/constans/url';
import { push } from 'redux-first-history';
import { jwtSelect } from '@redux/slise/select';
import { call, put, takeLatest, select } from 'redux-saga/effects';

import { setUseruserTraningList } from '@redux/slise/traningList-slise';
import { setModalError } from '../slise/trening-modals-slice';

import { getTraningCatalogsSaccses } from '@redux/slise/traning-catalogs-slise';

import {
    getAchievementTreningError,
    getAchievementTreningSuccess,
    getAchievementTreningStart,
    getAchievementTreningCatalogStart,
} from '@redux/slise/achievement-slice';

function* getAchievementTraningWorker() {
    const jwt: boolean | string = yield select(jwtSelect);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };
    yield put(push(Path.Achievement));
    try {
        const { data } = yield call(instance.get, AxiosPaths.TRANING, { headers });

        yield put(getAchievementTreningSuccess());
        yield put(setUseruserTraningList(data));
        yield put(getAchievementTreningCatalogStart());
    } catch (error) {
        yield put(getAchievementTreningError());
        // yield put(setModalError(true));
    }
}

function* getAchievementTraningCatalogsWorker() {
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        const { data } = yield call(instance.get, AxiosPaths.TRANING_CATALOG, { headers });
        yield put(getTraningCatalogsSaccses(data));
    } catch (error) {
        yield put(getTraningCatalogsSaccses([]));
    }
}

export function* achievementSagaWother() {
    yield takeLatest(getAchievementTreningStart.type, getAchievementTraningWorker);
    yield takeLatest(getAchievementTreningCatalogStart.type, getAchievementTraningCatalogsWorker);
}
