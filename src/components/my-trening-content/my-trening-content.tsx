import { useEffect } from 'react';
import { Button, Typography, Select, Table, Form } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { isPastDate } from '@utils/constans/getPastDate';
import { getTraningCatalogsStart } from '@redux/slise/traning-catalogs-slise';
import { updateTraning, deleteExercises } from '@redux/slise/traningList-slise';
import {
    createExercise,
    setPeriod,
    setCreateSelectedTraning,
    setRepeat,
    setSelectedTraning,
    resetCreatedTraining,
    setTreningDate,
} from '@redux/slise/traningList-slise';
import {
    desctopVersionSelect,
    selectedTraningSelect,
    createMyTreningSuccsessSelect,
    updateMyTreningSuccsessSelect,
    updateMyTreningErrorSelect,
    createMyTreningErrorSelect,
} from '@redux/slise/select';
import {
    putUpdateMyTraningStart,
    updateError,
    closeUpdateAlert,
} from '@redux/slise/update-my-trening-slice';
import {
    postCreateMyTreningsStart,
    closeCreateALert,
    resetCreateMyTreningError,
} from '@redux/slise/create-my-trening-slice';

import CastomDrawer from '@components/drawer/drawer';
import DrawerInput from '@components/drawer-input/drawer-input';
import MyTreningsBage from '@components/my-trenings-bage/my-trenings-bage';
import CreateDateTraning from '@components/create-date-traning/create-date-traning';
import Period from '@components/period/period';
import CastomAlert from '@components/custom-alert/castom-alert';
import ClanedarNotVarificationModal from '@pages/calendar-page/calendar-modal/calendar-not-varification-modal/calendar-not-varification-modal';

import style from './my-trening-content.module.css';

const { Title } = Typography;
const MyTreningContetnt = ({ catalog, treningList }) => {
    const showCreateAlert = useAppSelector(createMyTreningSuccsessSelect);
    const showUpdateAlert = useAppSelector(updateMyTreningSuccsessSelect);
    const createTreningError = useAppSelector(createMyTreningErrorSelect);
    const updateTreningError = useAppSelector(updateMyTreningErrorSelect);
    const selectedTrain = useAppSelector(selectedTraningSelect);
    const pastDate = isPastDate(selectedTrain?.date);
    const options = catalog?.map(({ name, key }) => ({ value: name, lable: key }));
    const [isEdit, setIsEdit] = useState(false);
    const [isCheced, setChecked] = useState(false);
    const [isOpenDrawer, setOpenDrawer] = useState(false);
    const [indexArray, setIndexeArray] = useState<number[]>([]);

    const dispatch = useAppDispatch();
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const repeat = selectedTrain?.parameters?.repeat;
    const period = selectedTrain?.parameters?.period;
    const disabledTraningBySelectName = !selectedTrain.name;
    const disableBtnByExercisesName = !selectedTrain.exercises.every(({ name }) => name !== '');

    const disableBtnSaveBtn = disableBtnByExercisesName || disabledTraningBySelectName;

    const deleteExercisesHedler = () => {
        dispatch(deleteExercises(indexArray));
        setIndexeArray([]);
    };
    const updateTrening = () => {
        pastDate
            ? dispatch(updateTraning({ isPast: true }))
            : dispatch(updateTraning({ isPast: false }));
        dispatch(putUpdateMyTraningStart());
        setOpenDrawer(false);
    };

    const createTrening = () => {
        dispatch(postCreateMyTreningsStart());
        setOpenDrawer(false);
    };

    const closeCreateALertHandler = () => {
        dispatch(closeCreateALert());
    };

    const closeUpdateAlertHandler = () => dispatch(closeUpdateAlert());

    const EditHandler = (selectTrein) => {
        dispatch(setSelectedTraning(selectTrein));
        setIsEdit(true);
        setOpenDrawer(true);
    };
    const columns = [
        {
            title: <div className={style.type_of_trening}>Тип тренировки</div>,
            dataIndex: 'name',
            key: 'treningType',
            with: '260px',
            render: (item, record) => {
                return (
                    <MyTreningsBage
                        isInplimintation={record.isImplementation}
                        key={record._id}
                        text={item}
                        trein={record}
                        onClickBtn={EditHandler}
                    />
                );
            },
        },
        {
            title: 'Периодичность',
            dataIndex: '.ant-table-column-sorters::after',
            key: 'period',
            width: !desctopVersion ? '100px' : '200px',
            render: (_, record, index) => (
                <Period key={record._id} trein={record} onClickBtn={EditHandler} index={index} />
            ),
            sorter: (a, b) => {
                return Number(a.parameters?.period) - Number(b.parameters?.period);
            },
        },
    ];

    const onSetIndexes = (index: number) => {
        if (indexArray.includes(index))
            setIndexeArray(indexArray.filter((element) => element !== index));
        else setIndexeArray([...indexArray, index]);
    };

    const openDrawer = () => {
        setIsEdit(false);
        setOpenDrawer(true);
        setChecked(false);
        dispatch(resetCreatedTraining());
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
        dispatch(resetCreatedTraining());
    };

    const closeCreateModal = () => {
        dispatch(resetCreateMyTreningError());
    };
    const closeUpdateModal = () => {
        dispatch(updateError());
    };
    const checkBoxHadler = () => {
        dispatch(setRepeat(!repeat));
    };
    const addExercise = () => dispatch(createExercise());

    const onChangePeriod = (selectedPeriod) => dispatch(setPeriod(selectedPeriod.value));

    const onChangeDate = (date) => dispatch(setTreningDate(date?.toISOString()));

    const onChangeName = (name) =>
        dispatch(setCreateSelectedTraning({ ...selectedTrain, name: name }));

    useEffect(() => {
        dispatch(getTraningCatalogsStart());
    }, [dispatch]);

    return (
        <>
            <CastomDrawer
                footerContent={
                    <Button
                        className={style.footer_btn}
                        type='primary'
                        block
                        disabled={disableBtnSaveBtn}
                        onClick={() => (isEdit ? updateTrening() : createTrening())}
                    >
                        Сохранить
                    </Button>
                }
                title={isEdit ? 'Редактирование' : 'Добавление упражнений'}
                desctopVersion={desctopVersion}
                open={isOpenDrawer}
                onClose={closeDrawer}
                isEdit={isEdit}
                data-test-id={'modal-drawer-right'}
            >
                <div className={style.drawer_wrapper}>
                    <Select
                        data-test-id='modal-create-exercise-select'
                        options={options}
                        onChange={onChangeName}
                        style={{ width: '100%', marginTop: '24px' }}
                        placeholder='Выбор типа тренировки'
                        defaultValue={selectedTrain.name ? selectedTrain.name : null}
                    />

                    <CreateDateTraning
                        defultPeriodValue={period}
                        defaultDateValue={selectedTrain?.date}
                        isCheced={repeat}
                        checkBoxHadler={checkBoxHadler}
                        onChangeDate={onChangeDate}
                        onChangePeriod={onChangePeriod}
                    />
                    {selectedTrain.exercises?.map(
                        ({ name, approaches, weight, replays }, index) => (
                            <DrawerInput
                                indexArray={indexArray}
                                checkBoxHadler={onSetIndexes}
                                key={index}
                                name={name}
                                index={index}
                                isEdit={isEdit}
                                defaultValueApproaches={approaches}
                                defaultValueWeight={weight}
                                defaultValueReplays={replays}
                            />
                        ),
                    )}

                    <div className={style.btn_wrapper}>
                        <Button
                            className={style.add_btn}
                            type='text'
                            icon={<PlusOutlined />}
                            size='small'
                            onClick={addExercise}
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
                </div>
            </CastomDrawer>
            {!treningList.length ? (
                <>
                    <div className={style.wrapper_empty}>
                        <div className={style.empty_treningList}>
                            <Title level={3} style={{ fontWeight: 500 }}>
                                У вас ещё нет созданных тренировок
                            </Title>
                            <div className={style.create_trening_btn}>
                                <Button
                                    className={style.empty_catalog_btn}
                                    size='large'
                                    onClick={openDrawer}
                                >
                                    Создать тренировку
                                </Button>
                            </div>
                        </div>

                        <div className={style.trening_list_wrapper}></div>
                    </div>
                </>
            ) : (
                <>
                    <div className={style.wrapper_fill}>
                        <div className={style.content}>
                            <Table
                                data-test-id='my-trainings-table'
                                className={style.table}
                                dataSource={treningList}
                                columns={columns}
                                showSorterTooltip={false}
                                size='small'
                                pagination={{
                                    size: 'small',
                                    defaultCurrent: 1,
                                    position: ['bottomLeft'],
                                    hideOnSinglePage: true,
                                }}
                            />
                        </div>
                        <Button
                            data-test-id='create-new-training-button'
                            onClick={openDrawer}
                            className={style.new_trin_btn}
                            type='primary'
                            size='large'
                            icon={<PlusOutlined />}
                        >
                            Новая Тренировка
                        </Button>
                    </div>

                    {showCreateAlert && (
                        <CastomAlert
                            dataTest={'create-training-success-alert'}
                            message='Новая тренировка успешно добавлена'
                            onClose={closeCreateALertHandler}
                        />
                    )}
                    {showUpdateAlert && (
                        <CastomAlert
                            dataTest='create-training-success-alert'
                            message='Тренировка успешно обновлена'
                            onClose={closeUpdateAlertHandler}
                        />
                    )}
                    {createTreningError && (
                        <ClanedarNotVarificationModal onClose={closeCreateModal} />
                    )}
                    {updateTreningError && (
                        <ClanedarNotVarificationModal onClose={closeUpdateModal} />
                    )}
                </>
            )}
        </>
    );
};

export default MyTreningContetnt;
