import JoinUserCard from '@components/join-user-card/join-user-card';
import { useState } from 'react';
import { Button, Input, List, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { showJoinUsersList } from '@redux/slise/join-trening-slice';
import { postInviteError } from '@redux/slise/invite-slice';
import { postInviteErrorSelect } from '@redux/slise/select';
import ClanedarNotVarificationModal from '@pages/calendar-page/calendar-modal/calendar-not-varification-modal/calendar-not-varification-modal';
import { sortedUsers } from '@utils/constans/sort-function';

import style from './join-users-content.module.css';

const { Title } = Typography;

const JoinUsersContent = ({ userList, onChangeHandler }) => {
    const [searchValue, setSearchValue] = useState('');
    const renderUsers = sortedUsers(userList, searchValue);
    const searchHandler = (value: string) => setSearchValue(value);
    const showErrorModal = useAppSelector(postInviteErrorSelect);
    const dispatch = useAppDispatch();

    const goBackHandler = () => dispatch(showJoinUsersList(false));

    const closeErrorModal = () => dispatch(postInviteError(false));

    return (
        <>
            {showErrorModal && <ClanedarNotVarificationModal onClose={closeErrorModal} />}
            <div className={style.wrapper}>
                <div className={style.header}>
                    <div className={style.go_back}>
                        <Button
                            onClick={goBackHandler}
                            type='text'
                            className={style.go_back_btn}
                            icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
                        >
                            <Title level={4}>Назад</Title>
                        </Button>
                    </div>
                    <Input.Search
                        data-test-id='search-input'
                        placeholder='Поиск по имени'
                        className={style.searh_input}
                        onSearch={searchHandler}
                    />
                </div>

                <List
                    className={style.list_wrapper}
                    dataSource={renderUsers}
                    renderItem={(user, index) => (
                        <JoinUserCard
                            user={user}
                            index={index}
                            onChangeHandler={onChangeHandler}
                            searchValue={searchValue}
                        />
                    )}
                    pagination={
                        userList.length > 12 && {
                            pageSize: 12,
                            size: 'small',
                        }
                    }
                />
            </div>
        </>
    );
};

export default JoinUsersContent;
