import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';
import { Path } from '../../utils/constans/url';
import { push } from 'redux-first-history';
import { jwtSelect } from '@redux/slise/select';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
    usersFedbacksAction,
    getFeedbacksStart,
    getFeedbacksSaccses,
    getFeedbacksError,
} from '@redux/slise/feedbacks-slise';
import {
    postFeedbacksStart,
    postFeedbacksSaccses,
    postFeedbacksError,
    postFeedbacksSettingsStart,
} from '@redux/slise/post-feedbakc-slise';

function* getFeedbacksWorker() {
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        const { data } = yield call(instance.get, AxiosPaths.FEEDBACK, { headers });
        yield put(usersFedbacksAction(data));
        yield put(push(Path.Feetbacks));
        yield put(getFeedbacksSaccses());
    } catch (error: unknown) {
        yield put(push(Path.Feetbacks));
        const status = error.response?.status;
        if (status === 403) {
            window.localStorage.removeItem('jwt');
            yield put(push(Path.Login));
        } else {
            yield put(getFeedbacksError('500'));
        }
    }
}

function* postFeedbacksWorker({ payload: { message, rating } }) {
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        yield call(instance.post, AxiosPaths.FEEDBACK, { message, rating }, { headers });
        yield put(getFeedbacksStart());
        yield put(postFeedbacksSaccses());
    } catch (error) {
        yield put(postFeedbacksError(true));
    }
}

function* postFeedbacksSettingsWorker({ payload: { message, rating } }) {
    try {
        const jwt: boolean | string = yield select(jwtSelect);
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        yield call(instance.post, AxiosPaths.FEEDBACK, { message, rating }, { headers });
        yield put(postFeedbacksSaccses());
    } catch (error) {
        yield put(postFeedbacksError(true));
    }
}

export function* feedbacksSagaWother() {
    yield takeLatest(getFeedbacksStart.type, getFeedbacksWorker);
    yield takeLatest(postFeedbacksStart.type, postFeedbacksWorker);
    yield takeLatest(postFeedbacksSettingsStart.type, postFeedbacksSettingsWorker);
}
