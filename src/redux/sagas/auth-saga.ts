import { instance } from '../../axios/axsios';
import { AxiosPaths } from '../../axios/axiosPaths';
import { Path } from '../../utils/constans/url';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getJoinTeningRequestsStart } from '@redux/slise/join-tening-requests-slice';
import {
    setJwt,
    postLoginStart,
    postLoginSaccses,
    postLoginError,
    postRegistratonStart,
    postRegistratonSaccses,
    postRegistratonError,
    postFogorPsswordStart,
    postFogorPsswordSaccses,
    postFogorPsswordError,
    postConfirmEmailStart,
    postConfirmEmailSaccses,
    postConfirmEmailError,
    postChengePasswordStart,
    postChengePasswordSaccses,
    postChengePasswordError,
} from '../slise/auth-slise';
import { push } from 'redux-first-history';

function* loginWorker({ payload: { password, email, isRemember, location } }) {
    try {
        const { data } = yield call(instance.post, AxiosPaths.LOG_IN, { email, password });
        yield put(setJwt(data.accessToken));
        yield put(push(Path.Main, location));

        if (isRemember) {
            localStorage.setItem('jwt', data.accessToken);
        }
        yield put(postLoginSaccses());
        yield put(getJoinTeningRequestsStart());
    } catch (err) {
        yield put(postLoginError());
        yield put(push(Path.ErrorLogin, location));
    }
}

function* registrationWorker({ payload: { password, email, location } }) {
    try {
        const { data } = yield call(instance.post, AxiosPaths.REGISTRATION, { email, password });

        yield put(postRegistratonSaccses());

        yield put(push(Path.RegistrationSucsses, location));
    } catch (err) {
        yield put(postRegistratonError(err.response.status));

        if (err.response.status === 409) {
            yield put(push(Path.ErrorUserExsist, location));
        } else {
            yield put(push(Path.ResulError, location));
        }
    }
}

function* fogotPassworWorker({ payload: { email, location } }) {
    try {
        const { data } = yield call(instance.post, AxiosPaths.CHECK_EMAIL, { email });

        yield put(postFogorPsswordSaccses());

        yield put(push(Path.ConfirmEmail, location));
    } catch (err) {
        yield put(postFogorPsswordError(err.response.status));

        if (err.response.status === 404 && err.response.data.message === 'Email не найден') {
            yield put(push(Path.CheckEmailNoExsist, location));
        } else if (err.response.data.message !== 'Email не найден') {
            yield put(push(Path.CheckEmail, location));
        }
    }
}

function* confirmEmailWorker({ payload: { code, email } }) {
    try {
        const { data } = yield call(
            instance.post,
            AxiosPaths.CONFIRM_EMAIL,
            { email, code },
            { withCredentials: true },
        );

        yield put(postConfirmEmailSaccses());

        yield put(push(Path.ChangePasword));
    } catch (error) {
        yield put(postConfirmEmailError(true));
    }
}

function* changePasswordWorker({ payload: { password, confirmPassword, location } }) {
    try {
        const { data } = yield call(
            instance.post,
            AxiosPaths.CHANGE_PASSWORD,
            { password, confirmPassword },
            { withCredentials: true },
        );

        yield put(postChengePasswordSaccses());

        yield put(push(Path.SuccsesChangePasword, location));
    } catch (error) {
        yield put(postChengePasswordError(true));

        yield put(push(Path.ErrorChangePassword, location));
    }
}

export function* authSagaWother() {
    yield takeLatest(postLoginStart.type, loginWorker);
    yield takeLatest(postRegistratonStart.type, registrationWorker);
    yield takeLatest(postFogorPsswordStart.type, fogotPassworWorker);
    yield takeLatest(postConfirmEmailStart.type, confirmEmailWorker);
    yield takeLatest(postChengePasswordStart.type, changePasswordWorker);
}
