import { Form, Radio, Typography } from 'antd';

import style from './tariff-costs.module.css';

const { Title } = Typography;
const TarifCosts = ({ tarifs, onChange }) => {
    return (
        <Form id='form' className={style.tariff_cost_form} data-test-id='tariff-cost'>
            <div className={style.title}>Стоимость тарифа</div>
            <Form.Item name='days'>
                <Radio.Group className={style.tariff_costs}>
                    {tarifs[0]?.periods.map(({ text, cost, days }) => (
                        <Radio
                            value={days}
                            key={text}
                            onChange={onChange}
                            data-test-id={`tariff-${cost}`}
                        >
                            <div className={style.tariff_cost}>
                                <span>{text}</span>
                                <Title level={5} style={{ marginBottom: 0 }}>
                                    {String(cost).replace('.', ',')} $
                                </Title>
                            </div>
                        </Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
        </Form>
    );
};

export default TarifCosts;
