import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import exitIcon from '../../assets/icons/Exit.svg';
import { Path } from '@utils/constans/url';
import style from './style.module.css';

const CastomTrigger: React.FC = () => {
    const navigate = useNavigate();
    const onClick = () => {
        localStorage.removeItem('jwt');
        navigate(Path.Login);
    };

    return (
        <>
            <div className={style.container}>
                <img  onClick={onClick} className={style.swither_icons} src={exitIcon} alt='icon' />
                <Button onClick={onClick} type='text'>
                    Выход
                </Button>
            </div>
        </>
    );
};

export default CastomTrigger;
