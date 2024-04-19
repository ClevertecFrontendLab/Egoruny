import { useState } from 'react';
import { Column, Pie } from '@ant-design/plots';
import { pieConfig } from '../../utils/constans/charts';
import { getTopExesiseByDay } from '@utils/constans/achievements-helper';
import AvargeLoad from '@components/average-load/average-load';
import WorkloadCards from '@components/workload-cards/workload-cards';
import TopPracticeExesise from '@components/top-practice-exesise/top-practice-exesise';
import ExesisesList from '@components/exesises-list/exesises-list';
import FilterPanel from '@components/filter-panel/filter-panel';
import EmptyTreningContent from '@components/empty-trening-content/empty-trening-content';

import style from './achivment.module.css';

const all = {
    name: 'Все',
    key: 'all',
};

const Achivment = ({
    catalog,
    setFilter,
    selectedFilter,
    dtaforConfig,
    filtredTrenings,
    isMonth,
}) => {
    const scrollBar = isMonth ? { x: { ratio: 0.5, value: 1 } } : false;
    const chartTitle = isMonth ? ' Средняя нагрузка по дням недели' : '';
    const exerciseByDay = getTopExesiseByDay(filtredTrenings);
    const pieData = getTopExesiseByDay(filtredTrenings);

    const config = {
        data: dtaforConfig,
        title: chartTitle,
        xField: 'date',
        yField: 'value',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: 16,
                titlePosition: 'bottom',
                titleFontSize: 14,
                tick: false,
                labelSpacing: 16,
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: 16,
            },
        },
        style: {
            fill: '#85A5FFFF',
        },
        sizeField: 25,
        scrollbar: scrollBar,
    };
    const TagNames = [all, ...catalog];

    return (
        <>
            <div className={style.wrapper}>
                <FilterPanel catalog={TagNames} setTag={setFilter} activeTag={selectedFilter} />
                {filtredTrenings.length ? (
                    <>
                        <div className={isMonth ? style.workload_month : style.workload}>
                            <div className={isMonth ? style.chart_month : style.chart}>
                                <Column {...config} />
                            </div>
                            <div className={isMonth ? style.month_list : style.week_list}>
                                <AvargeLoad dataSourse={dtaforConfig} isMonth={isMonth} />
                            </div>
                        </div>
                        <WorkloadCards dataSource={filtredTrenings} isMonth={isMonth} />
                        <TopPracticeExesise
                            selectedFilter={selectedFilter}
                            filterTranings={filtredTrenings}
                        />

                        <div className={style.pie_container}>
                            <div className={style.chart}>
                                <Pie {...pieConfig(pieData)} />
                            </div>
                            <div className={style.week_list}>
                                <ExesisesList dataSourse={exerciseByDay} isMonth={isMonth} />
                            </div>
                        </div>
                    </>
                ) : (
                    <EmptyTreningContent />
                )}
            </div>
        </>
    );
};

export default Achivment;
