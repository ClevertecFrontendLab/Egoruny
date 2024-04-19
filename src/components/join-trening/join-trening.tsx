import { Typography, Button, Badge } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import style from './join-trening.module.css';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import MyPartners from '@components/my-partners/my-partners';
import { getTreningPartnerStart } from '@redux/slise/join-trening-slice';
import { getJoinUsersStart, setTraningType } from '@redux/slise/join-trening-slice';
import { deleteExercises } from '@redux/slise/traningList-slise';
import { postInviteStart, setUserId } from '@redux/slise/invite-slice';

import { findTrainType } from '@utils/constans/find-trening-type';

import {
    joinUsersContentSelect,
    joinUsersSelect,
    selectedTraningSelect,
    joinTeningRequestsSelect,
    traningCatalogsSelect,
    userTraningListSelect,
    fetJoinUsersErrorSelect,
} from '@redux/slise/select';

import JoinUsersContent from '@components/join-users-content/join-users-content';
import AvatarUser from '@components/avatar/avatar';
import CastomDrawer from '@components/drawer/drawer';
import CreateDateTraning from '@components/create-date-traning/create-date-traning';
import DrawerInput from '@components/drawer-input/drawer-input';
import JointTraningRequests from '@components/joint-training-requests/joint-training-requests';
import CalendarModal from '@pages/calendar-page/calendar-modal/calendar-error-modal/calendar-error-modal';

import {
    createExercise,
    setPeriod,
    setCreateSelectedTraning,
    setRepeat,
    resetCreatedTraining,
} from '@redux/slise/traningList-slise';
import { bageColors } from '@utils/constans/bageColors';

const { Title, Text } = Typography;

const JoinTrening = () => {
    const showErrorModal = useAppSelector(fetJoinUsersErrorSelect);
    const treningCatalog = useAppSelector(traningCatalogsSelect);
    const treningList = useAppSelector(userTraningListSelect);
    const inviteList = useAppSelector(joinTeningRequestsSelect);
    const selectetTain = useAppSelector(selectedTraningSelect);
    const userList = useAppSelector(joinUsersSelect);
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [surName, setsurName] = useState('');
    const [src, setSrc] = useState('');
    const [isopenDrawer, setOpenDrawer] = useState(false);
    const [isRandomUsers, setIsrandomUsers] = useState(false);
    const [indexArray, setIndexeArray] = useState<number[]>([]);

    const [id, setId] = useState('');
    const dispatch = useAppDispatch();
    const isShowJoinUsersContent = useAppSelector(joinUsersContentSelect);
    const showInvites = inviteList.length !== 0;
    const repeat = selectetTain?.parameters?.repeat;
    const period = selectetTain?.parameters?.period;
    const treningType = findTrainType(treningList, treningCatalog);
    const disableSendBtn = selectetTain.exercises.every(({ name }) => name !== '');

    useEffect(() => {
        dispatch(getTreningPartnerStart());
    }, [dispatch]);

    const getJoinUserHandler = () => {
        setIsrandomUsers(true);
        dispatch(setTraningType(false));
        dispatch(getJoinUsersStart());
    };

    const getJoinUserTreningTypeHandler = () => {
        setIsrandomUsers(false);
        dispatch(setTraningType(treningType));
        dispatch(getJoinUsersStart());
    };

    const addExercise = () => dispatch(createExercise());

    const checkBoxHadler = () => {
        dispatch(setRepeat(!repeat));
    };
    const onChangePeriod = (selectedPeriod) => dispatch(setPeriod(selectedPeriod.value));

    const onSetIndexes = (index: number) => {
        if (indexArray.includes(index))
            setIndexeArray(indexArray.filter((element) => element !== index));
        else setIndexeArray([...indexArray, index]);
    };

    const onChangeDate = (date) =>
        dispatch(setCreateSelectedTraning({ ...selectetTain, date: date?.toISOString() }));

    const OpenDrawerHandler = (user, trningName, trening, userName, userSurname, UserSrc, id) => {
        dispatch(setCreateSelectedTraning({ ...trening, name: trningName }));
        setOpenDrawer(true);
        setName(userName);
        setsurName(userSurname);
        setSrc(UserSrc);
        setId(id);
        setUser(user);
    };
    const postInvate = () => {
        setOpenDrawer(false);
        dispatch(setUserId(user.id));
        dispatch(postInviteStart());
    };

    const deleteExercisesHedler = () => {
        dispatch(deleteExercises(indexArray));
        setIndexeArray([]);
    };

    const closeDrawer = () => {
        dispatch(resetCreatedTraining());
        setOpenDrawer(false);
    };

    if (isShowJoinUsersContent) {
        return (
            <>
                <JoinUsersContent userList={userList} onChangeHandler={OpenDrawerHandler} />
                <CastomDrawer
                    onClose={closeDrawer}
                    open={isopenDrawer}
                    title={'Совместная тренировка'}
                    footerContent={
                        <Button
                            disabled={!disableSendBtn}
                            type='primary'
                            block
                            onClick={postInvate}
                            className={style.invite_btn}
                        >
                            Отправить приглашение
                        </Button>
                    }
                >
                    <div className={style.drawer_header}>
                        <div className={style.user_info}>
                            <AvatarUser
                                alt={name}
                                src={src}
                                name={name}
                                surname={surName}
                                backgroundColor={'inherit'}
                            />
                        </div>
                        <Badge color={bageColors.get(selectetTain.name)} text={selectetTain.name} />
                    </div>
                    <div className={style.wrapper_drawer}>
                        <CreateDateTraning
                            block={true}
                            defultPeriodValue={period}
                            defaultDateValue={selectetTain?.date}
                            isCheced={repeat}
                            checkBoxHadler={checkBoxHadler}
                            onChangeDate={onChangeDate}
                            onChangePeriod={onChangePeriod}
                        />
                        <div className={style.exercises}>
                            {selectetTain.exercises?.map(
                                ({ name, approaches, weight, replays }, index) => (
                                    <DrawerInput
                                        indexArray={indexArray}
                                        checkBoxHadler={onSetIndexes}
                                        key={index}
                                        name={name}
                                        index={index}
                                        isEdit={true}
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
                                onClick={addExercise}
                            >
                                Добавить ещё
                            </Button>
                            <Button
                                type='text'
                                icon={<MinusOutlined />}
                                size='small'
                                disabled={!indexArray.length}
                                onClick={deleteExercisesHedler}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                </CastomDrawer>
            </>
        );
    }

    return (
        <div className={style.wrapper}>
            {showErrorModal && (
                <CalendarModal
                    updateHandler={
                        isRandomUsers ? getJoinUserHandler : getJoinUserTreningTypeHandler
                    }
                />
            )}
            {showInvites && <JointTraningRequests invateList={inviteList} />}
            <div className={style.title_conteiner}>
                <div className={style.title}>
                    <Title level={3} style={{ textAlign: 'center', color: ' #061178' }}>
                        Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                    </Title>
                    <Title
                        level={3}
                        style={{ marginTop: 0, textAlign: 'center', color: ' #061178' }}
                    >
                        Можешь найти друга для совместных тренировок среди других пользователей.
                    </Title>
                </div>
                <div className={style.text}>
                    <Text type='secondary'>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </Text>
                </div>
            </div>
            <div className={style.btn_container}>
                <Button type='link' onClick={getJoinUserHandler}>
                    Случайный выбор
                </Button>
                <Button type='text' block={false} onClick={getJoinUserTreningTypeHandler}>
                    Выбор друга по моим тренировкам{' '}
                </Button>
            </div>
            <MyPartners activeModal={true} inviteList={inviteList} />
        </div>
    );
};

export default JoinTrening;
