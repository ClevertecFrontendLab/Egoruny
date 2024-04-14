import { Typography, Button } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '@redux/configure-store';
import { treningPartnersSelect } from '@redux/slise/select';

import MyPartnersCard from '@components/my-partners-card/my-partners-card';

import style from './my-partners.module.css';

const { Title, Text } = Typography;

type MyPartnersProps = {
    activeModal?: boolean;
    inviteList?:[]
};


const MyPartners = ({ activeModal,inviteList }: MyPartnersProps) => {
    const myTreningPartners = useAppSelector(treningPartnersSelect);
    const [renderUsers,setrenderUsers] = useState(useAppSelector(treningPartnersSelect))

    return (
        <>
            <div className={style.my_partners}>
                <div className={style.title}>
                    <Title level={4}>Мои партнёры по тренировкам</Title>
                </div>
                <div className={style.partners}>
                    {myTreningPartners.length ? (
                        (renderUsers.length?renderUsers:myTreningPartners).map(
                            ({ imageSrc, name, avgWeightInWeek, trainingType,inviteId,id},index) => (
                                <MyPartnersCard
                                    userID={id}
                                    myTreningPartners={renderUsers}
                                    inviteList={inviteList}
                                    index={index}
                                    key={id}
                                    id={inviteId}
                                    isActiveModal={activeModal}
                                    name={name}
                                    src={imageSrc}
                                    teningType={trainingType}
                                    avgWeightInWeek={avgWeightInWeek}
                                    filteAr={setrenderUsers}
                                />
                            ),
                        )
                    ) : (
                        <Text type='secondary'>
                            У вас пока нет партнёров для совместных тренировок
                        </Text>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyPartners;
