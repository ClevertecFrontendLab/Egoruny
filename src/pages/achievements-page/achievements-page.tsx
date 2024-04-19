import { Layout, Tabs } from 'antd';
import Achivment from '@components/achivment/achivment';
import { useState } from 'react';
import moment from 'moment';
import { useAppSelector } from '@redux/configure-store';
import { traningCatalogsSelect, userTraningListSelect,getAchivmetnLoadSelect } from '@redux/slise/select';
import HeaderPages from '@components/header-pages/header-pages';



import {
    treningByPeriod,
    filteredTrainings,
    getDataByPlotConfig,
} from '@utils/constans/achievements-helper';
import style from './achievements-page.module.css';

const { Content } = Layout;

const AchievementPage = () => {

    const [filter, setFilter] = useState('Все');
    const trningCatalog = useAppSelector(traningCatalogsSelect);
    const traningList = useAppSelector(userTraningListSelect);
    const startDateWeek = moment().subtract(6, 'days');
    const endDateWeek = moment().endOf('day');
    const startDateMounh = moment().startOf('isoWeek').isoWeekday(1).subtract(3, 'weeks');
    const endDateMounh = moment().endOf('isoWeek').isoWeekday(7);
    const weekTranings = treningByPeriod(traningList, startDateWeek, endDateWeek);
    const filterTreningsWeek = filteredTrainings(weekTranings, filter);
    const plotDataWeek = getDataByPlotConfig(filterTreningsWeek, startDateWeek, endDateWeek);
    const monthsTrenings = treningByPeriod(traningList, startDateMounh, endDateMounh);
    const filterTreningsMonths = filteredTrainings(monthsTrenings, filter);
    const plotDataMounh = getDataByPlotConfig(filterTreningsMonths, startDateMounh, endDateMounh);





    

    const tabsItems = [
        {
            label: 'За неделю',
            key: 'for-week',
            children: (
                <Achivment
                    selectedFilter={filter}
                    catalog={trningCatalog}
                    filtredTrenings={filterTreningsWeek}

                    setFilter={setFilter}
                    dtaforConfig={plotDataWeek}
                    isMonth={false}
                />
            ),
        },
        {
            label: 'За месяц',
            key: 'for-month',
            children: (
                <Achivment
                    selectedFilter={filter}
                    catalog={trningCatalog}
                    filtredTrenings={filterTreningsMonths}

                    setFilter={setFilter}
                    dtaforConfig={plotDataMounh}
                    isMonth={true}
                />
            ),
        },
        {
            label: 'За все время (PRO)',
            key: 'for-all-time',
            children: 'PRO',
            disabled: true,
        },
    ];

    return (
        <>
            <HeaderPages breadcrumbItem='Достижения' />
            <Content className={style.wrapper}>
                <Tabs items={tabsItems} className={style.tabs_header_achievements}  destroyInactiveTabPane={true} centered />
            </Content>
        </>
    );
};

export default AchievementPage;
