import { Form, FormProps } from 'antd';
import SwithFields from '@components/swich-filed/swich-filed';
import { putProfileStart } from '@redux/slise/profile-slice';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { tariffOptions } from '@utils/constans/tarif';

import style from './options.module.css';

const Options = ({ isProVersion }) => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.profile.profile);

    const onFieldsChange: FormProps['onFieldsChange'] = (fields) => {
        const { name: names, value } = fields[0];
        const name = names[0];
        dispatch(putProfileStart({ ...profile, [name]: value }));
    };

    return (
        <>
            <Form onFieldsChange={onFieldsChange} initialValues={profile}>
                <div className={style.container}>
                    {tariffOptions.map(
                        (
                            { text, tooltip, name, availableInPro, dataTestId, dataTestIdTooltip },
                            index,
                        ) => (
                            <SwithFields
                                text={text}
                                key={index}
                                tooltip={tooltip}
                                name={name}
                                availableInPro={availableInPro}
                                isProVersion={isProVersion}
                                dataTestId={dataTestId}
                                dataTestIdTooltip={dataTestIdTooltip}
                            />
                        ),
                    )}
                </div>
            </Form>
        </>
    );
};

export default Options;
