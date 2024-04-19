import { Badge,Typography } from 'antd';
import moment from 'moment';




import style from './panel-content.module.css'

const { Text,  } = Typography;


const PanelContent = ({ data, bageColor }) => {

    return( 
    <>
   {     data.map((item, index) => (
        <div key={item.date} className={style.container}>
            <Badge count={index + 1} style={{
                                            backgroundColor: item.value ? bageColor : '#F0F5FFFF',
                                            color: item.value ? 'white' : bageColor,
                                        }} />
            <Text type='secondary'>{moment(item.date, 'DD.MM').format('DD.MM.YYYY')}</Text>
            <Text style={{ fontWeight: 700 }}>{item.value ? `${item.value}кг`:''}</Text>
        </div>
    ))}
    </>
    )
    ;
};



export default PanelContent