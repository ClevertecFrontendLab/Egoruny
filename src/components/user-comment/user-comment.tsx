import { Comment, Avatar, Tooltip, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import style from './user-comment.module.css';
import CastomRate from '@components/custom-rate/castom-rate';

const { Text } = Typography;

type FeedbackCommentProps = {
    fullName: string | null;
    image: string | null;
    rating: number;
    message: string | null;
    createdAt: string;
};

const UserComment: React.FC<FeedbackCommentProps> = ({
    fullName,
    image,
    message,
    rating,
    createdAt,
}) => {
    const [name, surname] = fullName?.split(' ') ?? [];
    return (
        <>
            <Comment
                className={style.user_comment}
                avatar={
                    <>
                        <div className={style.avatar}>
                            <Avatar
                                src={image}
                                icon={<UserOutlined />}
                                style={{ color: '#262626', backgroundColor: '#ffffff' }}
                                size={42}
                            />
                            <div className={style.author}>
                                <p>{name ? name : 'Пользователь'}</p>
                                <p>{surname}</p>
                            </div>
                        </div>
                    </>
                }
                content={
                    <p className={style.comment_text}>
                        <Text type='secondary'>{message}</Text>
                    </p>
                }
                datetime={
                    <>
                        <CastomRate defaultValue={rating} disabled />
                        <Tooltip>
                            <span className={style.date}>
                                {new Date(createdAt).toLocaleDateString('ru')}
                            </span>
                        </Tooltip>
                    </>
                }
            />
        </>
    );
};

export default UserComment;
