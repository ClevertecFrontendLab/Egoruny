import { Typography, Button } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import AvatarUser from '@components/avatar/avatar';
import ModalTrenngInfo from '@components/modal-trening-info/modal-trening-info';
import { useAppDispatch } from '@redux/configure-store';
import { putSendRequestStart } from '@redux/slise/send-request-slice';

import style from './invite-user-card.module.css';

const { Title, Text } = Typography;

const InviteUserCard = ({ user }) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const acceptSendHandler = () => {
        const id = user?._id;
        const status = 'accepted';
        dispatch(putSendRequestStart({ id, status }));
    };

    const rejectedSendHandler = () => {
        const id = user?._id;
        const status = 'rejected';
        dispatch(putSendRequestStart({ id, status }));
    };

    return (
        <div className={style.container_user}>
            <div className={style.avatar_user}>
                <AvatarUser
                    alt={user?.from?.firstName}
                    name={user?.from?.firstName}
                    surname={user?.from?.lastName}
                    backgroundColor={'white'}
                    src={user?.from?.imageSrc}
                />
            </div>
            <div className={style.massege}>
                <div className={style.date}>
                    <Text type='secondary'>{moment(user?.createdAt).format('DD.MM.YYYY')}</Text>
                </div>
                <div className={style.title}>
                    <Title level={5} style={{ color: '#061178', fontWeight: 'bold' }}>
                        Привет, я ищу партнёра для совместных [силовых тренировок]. Ты хочешь
                        присоединиться ко мне на следующих тренировках?
                    </Title>
                </div>
                <div className={style.user_info}>
                    <Button
                        className={style.show_detalis_trening_btn}
                        type='link'
                        onClick={openModal}
                    >
                        Посмотреть детали тренировки
                    </Button>
                    {showModal && (
                        <ModalTrenngInfo
                            onClose={closeModal}
                            exesise={user?.training?.exercises}
                            treningName={user?.training?.name}
                            period={user.training.parameters.period}
                            date={user.training?.date}
                        />
                    )}
                </div>
            </div>
            <div className={style.btn_wrapper}>
                <Button
                    className={style.trein_together}
                    type='primary'
                    size='large'
                    onClick={acceptSendHandler}
                >
                    Тренироваться вместе
                </Button>
                <Button size='large' onClick={rejectedSendHandler}>
                    Отклонить запрос
                </Button>
            </div>
        </div>
    );
};

export default InviteUserCard;
