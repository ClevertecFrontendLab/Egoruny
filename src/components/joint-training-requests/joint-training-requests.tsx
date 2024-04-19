import { Typography, Button, Badge } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AvatarUser from '@components/avatar/avatar';
import InviteUserCard from '@components/invite-user-card/invite-user-card';
import style from './joint-training-requests.module.css';

const { Title, Text } = Typography;

const JointTraningRequests = ({ invateList }) => {
    const [showAll, setShowAll] = useState(false);
    const isShowBtn = invateList.length > 1;

    const showAllInvites = () => setShowAll(true);

    const hideInvites = () => setShowAll(false);

    return (
        <div className={style.wrapper}>
            <div className={style.count_messeges}>
                <Text type='secondary'>Новое сообщение ({invateList.length})</Text>
            </div>

            {(showAll ? invateList : [invateList[0]])?.map((user) => (
                <InviteUserCard user={user} key={user?._id} />
            ))}

            {isShowBtn && (
                <Button
                    className={style.show_all_btn}
                    type='link'
                    onClick={!showAll ? showAllInvites : hideInvites}
                    icon={
                        showAll ? (
                            <UpOutlined style={{ fontSize: '12px' }} />
                        ) : (
                            <DownOutlined style={{ fontSize: '12px', paddingRight: '2px' }} />
                        )
                    }
                >
                    {!showAll ? 'Показать все сообщения' : ' Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};

export default JointTraningRequests;
