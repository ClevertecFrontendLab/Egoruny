import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { isLogedSelect } from '@redux/slise/select';
import { useAppSelector } from '@redux/configure-store';

import style from './result-page.module.css';
import Load from '../../../components/loader/loader';

const ResultPage = () => {
    const location = useLocation();
    const isLoged = useAppSelector(isLogedSelect);

    const from = !!location.state?.pathname;

    if (!from) {
        return <Navigate to='/' />;
    }

    return (
        <div className={style.result_wrapper}>
            {isLoged && <Load />}
            <div className={style.result_wrapper_blur}>
                <Outlet />
            </div>
        </div>
    );
};

export default ResultPage;
