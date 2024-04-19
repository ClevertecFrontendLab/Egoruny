import { Empty } from 'antd';

const EmtyContent = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            height: '100%',
        }}
    >
        <Empty
            description={null}
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            imageStyle={{
                height: 32,
                width: 32,
                display: 'flex',
                justifyContent: 'center',
            }}
        />
    </div>
);

export default EmtyContent;
