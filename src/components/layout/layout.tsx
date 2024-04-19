import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { setDesctopVersion } from '@redux/slise/app-slice';
import { useWindowSize } from '@uidotdev/usehooks';
import { useAppDispatch } from '@redux/configure-store';

const LayOut: React.FC = () => {
    const dispatch = useAppDispatch();
    const screenWidth = useWindowSize();
    useEffect(() => {
        Number(screenWidth.width) > 830
            ? dispatch(setDesctopVersion(true))
            : dispatch(setDesctopVersion(false));
    }, [dispatch, screenWidth]);
    return (
        <>
            <Outlet />
        </>
    );
};

export default LayOut;
