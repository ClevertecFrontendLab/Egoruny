import { Calendar, ConfigProvider } from 'antd';
import { useState, useEffect } from 'react';
import { useWindowSize } from '@uidotdev/usehooks';
import { setDesctopVersion } from '@redux/slise/app-slice';
import type { Moment } from 'moment';
import React from 'react';
import moment from 'moment';
import ruRU from 'antd/lib/locale/ru_RU';
import 'moment/locale/ru';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import CalendarModal from '@pages/calendar-page/calendar-modal/calendar-error-modal/calendar-error-modal';
import {
    traningCatalogsErrorSelect,
    desctopVersionSelect,
    userTraningListSelect,
    updateErrorSelect,
    createErrorSelect,
    isOpenModalSelect,
    prevDataSelect,
} from '@redux/slise/select';
import { togleModal, setPrevData, setModalStatus } from '@redux/slise/trening-modals-slice';
import { CalendarModalStatus } from '@utils/constans/modal-status';
import { resetCreatedTraining, setSelectedDate } from '@redux/slise/traningList-slise';
import { putUpdateTreningError } from '@redux/slise/update-trening-slice';
import { postCreateTreningError } from '@redux/slise/create-traning-slice';

import RenderBage from '@components/render-bage/render-bage';
import ClanedarNotVarificationModal from '../../pages/calendar-page/calendar-modal/calendar-not-varification-modal/calendar-not-varification-modal';
import PortalComponent from '@components/portal/portal';

import { getOffsetTop, getTrainingByDay } from '@utils/constans/traning';

import style from './calendar-content.module.css';

moment.updateLocale('ru', {
    monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
    weekdaysMin: 'Вс_Пн_Вт_Ср_Чт_Пт_Сб'.split('_'),
    week: {
        dow: 1,
    },
});

const CalendarContent: React.FC = () => {
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const dispatch = useAppDispatch();
    const trenings = useAppSelector(userTraningListSelect);
    const isOpenModal = useAppSelector(isOpenModalSelect);
    const prevData = useAppSelector(prevDataSelect);
    const [activeDateModal, setActiveDateModal] = useState<string | undefined>(undefined);
    const [dataModal, setdataModal] = useState<Moment>(moment());
    const [offsetTop, setOffsetTop] = useState(0);
    const screenWidth = useWindowSize();

    useEffect(() => {
        Number(screenWidth.width) > 830
            ? dispatch(setDesctopVersion(true))
            : dispatch(setDesctopVersion(false));
    }, [dispatch, screenWidth]);

    const dateCellRender = (date: Moment) => {
        const getTraning = getTrainingByDay(date.toISOString(true), trenings);

        if (!desctopVersion) return undefined;

        return <RenderBage trainings={getTraning} />;
    };

    const modalOpen = (date: Moment) => {
        const CurentData = date.format('YY-MM');
        dispatch(setPrevData(date.format('YY-MM')));
        if (CurentData === prevData) {
            dispatch(resetCreatedTraining());
            dispatch(setSelectedDate(moment(date).toISOString(true)));
            const targetElements = `[title ="${moment(date).format('YYYY-MM-DD')}"]`;
            if (Number(screenWidth.width) > 480) {
                setActiveDateModal(targetElements);
                setOffsetTop(0);
            } else {
                setActiveDateModal(undefined);
                setOffsetTop(getOffsetTop(date));
            }
            dispatch(setModalStatus(CalendarModalStatus.TRAINING));
            dispatch(togleModal(true));
            setdataModal(date);
        } else {
            dispatch(togleModal(false));
        }
    };

    const resetUpdateError = () => dispatch(putUpdateTreningError(false));
    const resetCreateError = () => dispatch(postCreateTreningError(false));

    const traningCatalogError = useAppSelector(traningCatalogsErrorSelect);
    const updateError = useAppSelector(updateErrorSelect);
    const createError = useAppSelector(createErrorSelect);

    return (
        <>
            {createError && <ClanedarNotVarificationModal onClose={resetCreateError} />}
            {updateError && <ClanedarNotVarificationModal onClose={resetUpdateError} />}
            {traningCatalogError && <CalendarModal />}
            <ConfigProvider locale={ruRU}>
                <Calendar
                    fullscreen={desctopVersion}
                    onSelect={modalOpen}
                    className={style.calendar}
                    dateCellRender={dateCellRender}
                />
                {isOpenModal && (
                    <PortalComponent
                        offsetTop={offsetTop}
                        container={activeDateModal}
                        date={dataModal}
                    />
                )}
            </ConfigProvider>
        </>
    );
};

export default CalendarContent;
