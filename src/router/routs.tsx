import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Path } from '../utils/constans/url';
import { setJwt } from '@redux/slise/auth-slise';
import { useAppDispatch } from '@redux/configure-store';

import MainPage from '../pages/main-page/main-page';
import Auth from '@pages/auth-page/auth/auth';
import ResultErrorPage from '@pages/result/result-error-page/result-error-page';
import LayOut from '@components/layout/layout';
import ResultPage from '@pages/result/result-page/resulr-page';
import ResultErrorLoginPage from '@pages/result/result-error-login-page/result-error-login-page';
import ResultSucssePage from '@pages/result/result-sucsees-page/result-sucsees-page';
import ErrorUserExsist from '@pages/result/result-error -user-exist-page/error-user-exist';
import ResultErrorCheckEmailExist from '@pages/result/result-error-check-email-exist/result-error-check-email-exist';
import ResultErrorCheckEmail from '@pages/result/result-error-check-email/result-error-check-email';
import ConfirmEmail from '@pages/auth-page/confirm-email/confirm-email';
import ChangePasword from '@pages/auth-page/change-password/change-password';
import ResultErrorChangePassword from '@pages/result/result-error-change-password/result-error-change-password';
import ResultSuccsesChangePassword from '@pages/result/result-succses-change-password-page/result-succses-change-password';
import MainContent from '@components/main-content/main-content';
import Feedbacks from '@pages/feedbacks-page/feedbacks';
import CalendarPage from '@pages/calendar-page/calendar-page';
import ProfilePage from '@pages/profile-page/profile-page';
import SettingsPage from '@pages/settings-page/settings-page';
import MyTrningsPage from '@pages/my-trenings-page/my-trenings-page';
import AchievementPage from '@pages/achievements-page/achievements-page';

export const App = () => {
    const dispatch = useAppDispatch();
    const [serchParams] = useSearchParams();
    const accessToken = serchParams.get('accessToken');

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem('jwt', accessToken);
            dispatch(setJwt(accessToken));
        }
    }, [accessToken, dispatch]);

    return (
        <>
            <Routes>
                <Route path='*' element={<Auth tab='login' />} />
                <Route path='/' element={<LayOut />}>
                    <Route index={true} element={<Navigate to={Path.Login} />} />
                    <Route path={Path.Login} element={<Auth tab='login' />} />
                    <Route path={Path.Register} element={<Auth tab='register' />} />
                    <Route element={<MainPage />}>
                        <Route path={Path.Main} element={<MainContent />} />
                        <Route path={Path.Calendar} element={<CalendarPage />} />
                        <Route path={Path.Profile} element={<ProfilePage />} />
                        <Route path={Path.Settings} element={<SettingsPage />} />
                        <Route path={Path.MyTrenings} element={<MyTrningsPage />} />
                        <Route path={Path.Achievement} element={<AchievementPage />} />
                    </Route>
                    <Route element={<MainPage />}>
                        <Route path={Path.Feetbacks} element={<Feedbacks />} />
                    </Route>
                </Route>
                <Route path={Path.Result} element={<ResultPage />}>
                    <Route path={Path.ErrorLogin} element={<ResultErrorLoginPage />} />
                    <Route path={Path.RegistrationSucsses} element={<ResultSucssePage />} />
                    <Route path={Path.ResulError} element={<ResultErrorPage />} />
                    <Route path={Path.ErrorUserExsist} element={<ErrorUserExsist />} />
                    <Route
                        path={Path.CheckEmailNoExsist}
                        element={<ResultErrorCheckEmailExist />}
                    />
                    <Route path={Path.CheckEmail} element={<ResultErrorCheckEmail />} />
                    <Route
                        path={Path.ErrorChangePassword}
                        element={<ResultErrorChangePassword />}
                    />
                    <Route
                        path={Path.SuccsesChangePasword}
                        element={<ResultSuccsesChangePassword />}
                    />
                </Route>

                <Route path={Path.ConfirmEmail} element={<ConfirmEmail />} />
                <Route path={Path.ChangePasword} element={<ChangePasword />} />
            </Routes>
        </>
    );
};
