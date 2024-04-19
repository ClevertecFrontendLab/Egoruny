import { authSagaWother } from './sagas/auth-saga';
import { feedbacksSagaWother } from './sagas/feedbacks-saga';
import { traningListSagaWother } from './sagas/traning-list-saga';
import { profileSagaWother } from './sagas/profile-saga';
import { myTraningListSagaWother } from './sagas/my-trenings-saga';
import { joinTreningsSagaWother } from './sagas/join-trenind-saga';
import { invateWather } from './sagas/invite-saga';
import { achievementSagaWother } from './sagas/achievement-saga';
import { all } from 'redux-saga/effects';

export function* runSaga(): Generator {
    yield all([
        authSagaWother(),
        feedbacksSagaWother(),
        traningListSagaWother(),
        profileSagaWother(),
        myTraningListSagaWother(),
        joinTreningsSagaWother(),
        invateWather(),
        achievementSagaWother(),
    ]);
}
