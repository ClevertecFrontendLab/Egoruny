import { Typography, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import CalendarCreateTraningModal from '../calendar-create-traning-modal/calendar-create-traning-modal';
import CalendarExercisesModal from '../calendar-exercises-modal/calendar-exercises-modal';
import DrawerInput from '@components/drawer-input/drawer-input';
import CastomDrawer from '@components/drawer/drawer';
import CalendarCastomBage from '@components/calendar-castom-bage/calendar-castom-bage';
import { useState } from 'react';
import moment from 'moment';
import { isPastDate } from '@utils/constans/getPastDate';
import { setModalStatus } from '@redux/slise/trening-modals-slice';
import { CalendarModalStatus } from '@utils/constans/modal-status';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { calendarModalStatusSelect } from '@redux/slise/select';
import {
    setSelectedTraning,
    setSelectedPrevTrain,
    resetCreatedTraining,
} from '@redux/slise/traningList-slise';
import {
    userTraningListSelect,
    selectedDateSelect,
    selectedTraningSelect,
    desctopVersionSelect,
} from '@redux/slise/select';
import { createExercise, deleteExercises, filtredExersise } from '@redux/slise/traningList-slise';

import { getTrainingByDay } from '@utils/constans/traning';
import style from './calendar-cell-modal.module.css';
const { Text } = Typography;

const CalendarCellModal = ({ date, offsetTop }) => {
    const [indexArray, setIndexeArray] = useState<number[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const dispatch = useAppDispatch();
    const trenings = useAppSelector(userTraningListSelect);
    const dateSelected = useAppSelector(selectedDateSelect);
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const modalStatus = useAppSelector(calendarModalStatusSelect);
    const trainingByDay = getTrainingByDay(date, trenings);
    const pastDate = isPastDate(date);
    const selectetTain = useAppSelector(selectedTraningSelect);
    const cardRigth = moment(dateSelected).day() === 0 || moment(dateSelected).day() === 6;


    const setExercisesStatus = () => {
        setIsEdit(false);
        dispatch(resetCreatedTraining());
        dispatch(setModalStatus(CalendarModalStatus.EXERCISES));
    };

    const setTreningStatus = () => {
        dispatch(resetCreatedTraining());
        dispatch(setModalStatus(CalendarModalStatus.TRAINING));
    };

    const onClick = () => dispatch(createExercise());

    const onSetIndexes = (index: number) => {
        if (indexArray.includes(index))
            setIndexeArray(indexArray.filter((element) => element !== index));
        else setIndexeArray([...indexArray, index]);
    };

    const deleteExercisesHedler = () => {
        dispatch(deleteExercises(indexArray));
        setIndexeArray([]);
    };

    const onChangeTrainingHandler = (name: string) => {
        setIsEdit(true);
        const findedSelectTraning = trainingByDay.find((exercise) => exercise?.name === name);
        if (findedSelectTraning) {
            dispatch(setSelectedTraning(findedSelectTraning));
            dispatch(setModalStatus(CalendarModalStatus.EXERCISES));
            dispatch(setSelectedPrevTrain(findedSelectTraning));
        }
    };
    const openDrawer = () => {
        setIsEdit(false);
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        if (selectetTain.exercises.length === 1 && !selectetTain.exercises[0].name) {
            dispatch(resetCreatedTraining());
        } else if(selectetTain.exercises[0].name) {
            dispatch(filtredExersise());
        }
        setOpenDrawer(false);
    };



    const onChangeExercisesDrawerOpen = () => {
        setIsEdit(true);
        setOpenDrawer(true);
    };
    return (
        <>
            <div
                style={{ right: cardRigth ? 0 : '', top: offsetTop }}
                className={style.modal_wrapper}
            >
                {modalStatus === CalendarModalStatus.TRAINING && (
                    <CalendarCreateTraningModal
                        setIsEdit={setIsEdit}
                        isPastDate={pastDate}
                        trenings={trainingByDay}
                        date={date}
                        setExercisesStatus={setExercisesStatus}
                        onChange={onChangeTrainingHandler}
                    />
                )}
                {modalStatus === CalendarModalStatus.EXERCISES && (
                    <CalendarExercisesModal
                        setIsEdit={setIsEdit}
                        trainings={trainingByDay}
                        isEdit={isEdit}
                        date={date}
                        setTreningStatus={setTreningStatus}
                        openDrawer={openDrawer}
                        onChangeExercisesDrawerOpen={onChangeExercisesDrawerOpen}
                        isPastDate={pastDate}
                    />
                )}
            </div>
            <CastomDrawer
                closable={true}
                title={isEdit ? 'Редактирование' : 'Добавление упражнений'}
                open={isOpenDrawer}
                onClose={closeDrawer}
                date={date}
                isEdit={isEdit}
                desctopVersion={desctopVersion}
            >
                <div className={style.discription_container}>
                    <div>
                        <CalendarCastomBage text={selectetTain?.name} openedInDrawer={true} />
                    </div>
                    <div>
                        <Text type='secondary'>{date.format('DD.MM.YYYY')}</Text>
                    </div>
                </div>
                <div className={style.inputs_drawer}>
                    {selectetTain?.exercises?.map(
                        ({ name, approaches, weight, replays }, index) => (
                            <DrawerInput
                                key={index}
                                indexArray={indexArray}
                                checkBoxHadler={onSetIndexes}
                                name={name}
                                index={index}
                                isEdit={isEdit}
                                defaultValueApproaches={approaches}
                                defaultValueWeight={weight}
                                defaultValueReplays={replays}
                            />
                        ),
                    )}
                </div>
                <div className={style.btn_wrapper}>
                    <Button
                        className={style.add_btn}
                        type='text'
                        icon={<PlusOutlined />}
                        size='small'
                        onClick={onClick}
                    >
                        Добавить ещё
                    </Button>
                    {isEdit && (
                        <Button
                            type='text'
                            icon={<MinusOutlined />}
                            size='small'
                            disabled={!indexArray.length}
                            onClick={deleteExercisesHedler}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </CastomDrawer>
        </>
    );
};

export default CalendarCellModal;
