import { Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import style from './period.module.css';

const Period = ({ key, trein, onClickBtn, index }) => {
    const periods = new Map([
        [1, 'Через 1 день'],
        [2, 'Через 2 дня'],
        [3, 'Через 3 дня'],
        [4, 'Через 4 дня'],
        [5, 'Через 5 дней'],
        [6, 'Через 6 дней'],
        [7, '1 раз в неделю'],
    ]);

    return (
        <div className={style.wrapper} key={key}>
            <span>
                {trein.parameters?.period === null
                    ? moment(trein.date).format('YYYY-MM-DD')
                    : periods.get(trein.parameters?.period)}
            </span>
            <Button
                data-test-id={`update-my-training-table-icon${index}`}
                icon={<EditOutlined />}
                disabled={trein?.isImplementation}
                className={style.edit_btn}
                onClick={() => onClickBtn(trein)}
            />
        </div>
    );
};

export default Period;
