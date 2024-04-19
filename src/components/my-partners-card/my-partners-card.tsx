import { Card, Typography, Modal, Button } from 'antd';
import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { deleteCansleTraningStart } from '@redux/slise/cansle-trening-slise';
import { useAppDispatch } from '@redux/configure-store';

import AvatarUser from '@components/avatar/avatar';

import style from './my-partners-card.module.css';

type MyPartnersCardProps = {
    name: string;
    src: string;
    teningType: string;
    avgWeightInWeek: number;
    isActiveModal?: boolean;
    id: string;
    index: number;
};

const MyPartnersCard = ({
    name,
    src,
    teningType,
    avgWeightInWeek,
    isActiveModal,
    id,
    index,
}: MyPartnersCardProps) => {
    const dispatch = useAppDispatch();
    const [isOpen, setOpen] = useState(false);
    const [Username, surname] = name?.split(' ') ?? [];

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    const cansleTreningHandler = () => {
        setOpen(false);
        dispatch(deleteCansleTraningStart({ id }));
    };

    return (
        <>
            <Card
                data-test-id={`joint-training-cards${index}`}
                onClick={isActiveModal ? openModal : undefined}
                className={style.partners_card}
                bodyStyle={{ padding: '12px' }}
            >
                <div className={style.card_wrapper}>
                    <div className={style.card_header}>
                        <AvatarUser
                            name={Username}
                            surname={surname}
                            src={src}
                            alt={name}
                            backgroundColor={'white'}
                        />
                    </div>
                    <div className={style.user_trenings}>
                        <div className={style.trening_type}>
                            <Typography.Paragraph type='secondary'>
                                Тип тренировки:
                            </Typography.Paragraph>
                            <Typography.Paragraph style={{ color: '#2F54EB' }}>
                                {teningType}
                            </Typography.Paragraph>
                        </div>
                        <div className={style.trening_type}>
                            <Typography.Paragraph type='secondary'>
                                {' '}
                                Средняя нагрузка:
                            </Typography.Paragraph>
                            <Typography.Paragraph style={{ color: '#2F54EB' }}>
                                {' '}
                                {avgWeightInWeek} кг/нед
                            </Typography.Paragraph>
                        </div>
                    </div>
                </div>
            </Card>
            <Modal
                data-test-id='partner-modal'
                open={isOpen}
                onCancel={closeModal}
                footer={null}
                maskStyle={{ background: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(6px)' }}
                centered
            >
                <div className={style.user_modal_wrapper}>
                    <div className={style.modal_header}>
                        <div className={style.avatar_modal}>
                            <AvatarUser
                                name={Username}
                                surname={surname}
                                src={src}
                                alt={name}
                                backgroundColor={'white'}
                            />
                        </div>
                        <div className={style.modal_trening_info}>
                            <div className={style.trening_type_modal}>
                                <Typography.Paragraph type='secondary'>
                                    Тип тренировки:
                                </Typography.Paragraph>
                                <Typography.Paragraph style={{ color: '#2F54EB' }}>
                                    {teningType}
                                </Typography.Paragraph>
                            </div>
                            <div className={style.trening_type_modal}>
                                <Typography.Paragraph type='secondary'>
                                    {' '}
                                    Средняя нагрузка:
                                </Typography.Paragraph>
                                <Typography.Paragraph style={{ color: '#2F54EB' }}>
                                    {' '}
                                    {avgWeightInWeek} кг/нед
                                </Typography.Paragraph>
                            </div>
                        </div>
                    </div>
                    <div className={style.modal_footer}>
                        <div className={style.accepted_trenig_modal}>
                            <div className={style.text}>тренировка одобрена</div>
                            <div className={style.icon}>
                                <CheckCircleFilled style={{ color: '#52C41A' }} />
                            </div>
                        </div>
                        <Button onClick={cansleTreningHandler} className={style.reject_btn}>
                            Отменить тренировку
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MyPartnersCard;
