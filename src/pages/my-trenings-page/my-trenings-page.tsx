import { Layout, Tabs, Badge } from 'antd';
import { traningCatalogsSelect } from '@redux/slise/select';
import {
    userTraningListSelect,
    showMypartnerSelect,
    joinTeningRequestsSelect,
    getJointreningsLoadSelect,
} from '@redux/slise/select';
import { useAppSelector } from '@redux/configure-store';
import { traningCatalogsErrorSelect } from '@redux/slise/select';
import CalendarModal from '@pages/calendar-page/calendar-modal/calendar-error-modal/calendar-error-modal';
import MyTreningContetnt from '@components/my-trening-content/my-trening-content';
import JoinTrening from '@components/join-trening/join-trening';
import MyPartners from '@components/my-partners/my-partners';
import HeaderPages from '@components/header-pages/header-pages';
import Loader from '@components/loader/loader';

import style from './my-trenings-page.module.css';

const { Content } = Layout;

const MyTrningsPage = () => {
    const joinTreningsLoad = useAppSelector(getJointreningsLoadSelect);
    const trenings = useAppSelector(userTraningListSelect);
    const catalog = useAppSelector(traningCatalogsSelect);
    const catalogError = useAppSelector(traningCatalogsErrorSelect);
    const isShowMyPartner = useAppSelector(showMypartnerSelect);
    const myInvites = useAppSelector(joinTeningRequestsSelect);

    const tabsItems = [
        {
            label: 'Мои тренировки',
            key: 'my-workouts',
            children: <MyTreningContetnt catalog={catalog} treningList={trenings} />,
        },
        {
            label: (
                <span>
                    Совместные тренировки
                    <Badge count={myInvites.length < 4 ? myInvites?.length : 0} />
                </span>
            ),
            key: 'group-workouts',
            children: isShowMyPartner ? <MyPartners activeModal={true} /> : <JoinTrening />,
        },
        {
            label: 'Марафоны',
            key: 'marathons',
            children: 'Marathons',
        },
    ];

    return (
        <>
            {joinTreningsLoad && <Loader />}
            <HeaderPages breadcrumbItem='Тренировки' />

            <Content className={style.wrapper}>
                {catalogError && <CalendarModal />}
                <Tabs items={tabsItems} className={style.tabs_header} />
            </Content>
        </>
    );
};

export default MyTrningsPage;
