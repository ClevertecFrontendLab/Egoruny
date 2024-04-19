import { Menu, Badge } from 'antd';
import style from './style.module.css';
import { Path } from '../../utils/constans/url';
import { useAppDispatch, useAppSelector } from '@redux/configure-store';
import { joinTeningRequestsSelect } from '@redux/slise/select';
import { push } from 'redux-first-history';
import { getTreningsStart } from '@redux/slise/my-trenings-slice';
import { HeartFilled, TrophyFilled, CalendarTwoTone, IdcardOutlined } from '@ant-design/icons';
import { getAchievementTreningStart } from '@redux/slise/achievement-slice';

import { getTraningListStart } from '@redux/slise/traningList-slise';

const iconsColor: React.CSSProperties = {
    color: '#061178',
    paddingLeft: '0px',
};

const NavigationMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const myInvites = useAppSelector(joinTeningRequestsSelect);

    const handleClick = (e) => {
        switch (e.key) {
            case '1':
                dispatch(getTraningListStart());
                break;
            case '2':
                dispatch(getTreningsStart());
                break;
            case '3':
                dispatch(getAchievementTreningStart());
                break;
            case '4':
                dispatch(push(Path.Profile));
                break;
            default:
                break;
        }
    };

    const itemsMenu = [
        {
            key: '1',
            icon: <CalendarTwoTone twoToneColor={['#061178', '#061178']} />,
            label: ' Календарь',
        },
        {
            key: '2',
            icon: <HeartFilled data-test-id='menu-button-training ' style={iconsColor} />,
            label: (
                <span>
                    Тренировки{' '}
                    <Badge
                        count={myInvites.length < 4 ? myInvites?.length : 0}
                        data-test-id='notification-about-joint-training'
                    />
                </span>
            ),
        },
        {
            key: '3',
            icon: <TrophyFilled style={iconsColor} data-test-id='sidebar-achievements' />,
            label: 'Достижения',
        },
        {
            key: '4',
            icon: <IdcardOutlined style={iconsColor} />,
            label: 'Профиль',
        },
    ];

    return (
        <Menu
            className={style.adaptiv_menu}
            onClick={handleClick}
            defaultSelectedKeys={['1']}
            items={itemsMenu}
        />
    );
};

export default NavigationMenu;
