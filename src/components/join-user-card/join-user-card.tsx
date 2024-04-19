import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@redux/configure-store';
import { selectedTraningSelect } from '@redux/slise/select';
import { Button, Card, Typography } from 'antd';
import { inviteStaus } from '@utils/constans/inviteStatus';
import style from './join-user-card.module.css';
import AvatarUser from '@components/avatar/avatar';

const JoinUserCard = ({ user, index, onChangeHandler, searchValue }) => {
    const selectetTain = useAppSelector(selectedTraningSelect);
    const [name, surname] = user.name?.split(' ') ?? [];
    const isAccepted = user.status === inviteStaus.accepted;
    const isPending = user.status === inviteStaus.pending;
    const isRejected = user.status === inviteStaus.regected;

    return (
        <Card
            data-test-id={`joint-training-cards${index}`}
            className={style.user_card}
            bodyStyle={{
                padding: '4px 16px 0 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <div className={style.user_info}>
                <AvatarUser
                    isUserCard={true}
                    searchValue={searchValue}
                    index={index}
                    alt={user.name}
                    src={user.imageSrc}
                    name={name}
                    surname={surname}
                    backgroundColor={' #F0F5FF'}
                />
            </div>
            <div className={style.user_trenings}>
                <div className={style.trening_type}>
                    <Typography.Paragraph type='secondary'> Тип тренировки:</Typography.Paragraph>
                    <Typography.Paragraph style={{ color: '#2F54EB' }}>
                        {' '}
                        {user.trainingType}
                    </Typography.Paragraph>
                </div>
                <div className={style.trening_type}>
                    <Typography.Paragraph type='secondary'> Средняя нагрузка:</Typography.Paragraph>
                    <Typography.Paragraph style={{ color: '#2F54EB' }}>
                        {' '}
                        {user.avgWeightInWeek}кг/нед
                    </Typography.Paragraph>
                </div>
            </div>
            <div className={style.card_footer}>
                <Button
                    block
                    size='small'
                    type='primary'
                    className={style.create_traning_btn}
                    disabled={isRejected || isAccepted || isPending}
                    onClick={() =>
                        onChangeHandler(
                            user,
                            user.trainingType,
                            selectetTain,
                            name,
                            surname,
                            user.imageSrc,
                            user.id,
                        )
                    }
                >
                    Создать тренировку
                </Button>
                <div className={style.trening_status}>
                    {user?.status && (
                        <>
                            <span>
                                {' '}
                                {isPending && 'ожидает подтверждения'}
                                {isAccepted && 'запрос одобрен'}
                                {isRejected && 'запрос отклонен'}{' '}
                            </span>

                            {isAccepted && <CheckCircleFilled style={{ color: '#52C41A' }} />}
                            {isRejected && (
                                <ExclamationCircleOutlined style={{ color: '#8C8C8C' }} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default JoinUserCard;
