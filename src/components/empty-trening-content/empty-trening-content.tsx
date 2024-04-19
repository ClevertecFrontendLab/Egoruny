import { Typography } from 'antd';
import emptyImg from '../../assets/img/EmptyTranings.svg';
import style from './empty-trening-content.module.css';

const { Title } = Typography;

const EmptyTreningContent = () => (
    <div className={style.emty_content_wrapper}>
        <div className={style.empty_content}>
            <figure>
                <img src={emptyImg} alt='Empty' />{' '}
            </figure>
            <div className={style.title}>
                <Title level={3}>Ой, такой тренировки на этой неделе не было.</Title>
            </div>
        </div>
    </div>
);

export default EmptyTreningContent;
