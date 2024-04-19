import { Modal, Upload, Typography, Form, Button } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useAppSelector } from '@redux/configure-store';
import { jwtSelect } from '@redux/slise/select';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import { AxiosPaths } from '../../axios/axiosPaths';
import { URL } from '@utils/constans/url';
import { desctopVersionSelect } from '@redux/slise/select';
import ClanedarNotVarificationModal from '@pages/calendar-page/calendar-modal/calendar-not-varification-modal/calendar-not-varification-modal';

import style from './profile-upload.module.css';

type ProfileUploadProps = {
    imgSrc: string;
};

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const { Text } = Typography;

const ProfileUpload = ({ imgSrc }: ProfileUploadProps) => {
    const token = useAppSelector(jwtSelect);

    const initialFile = {
        uid: '-2',
        name: 'image.jpg',
        url: imgSrc,
    };
    const errorFile = [
        {
            uid: '1',
            status: 'error',
            name: 'image.jpg',
        },
    ];

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [isBigFileError, setIsBigFileError] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>(imgSrc ? [initialFile] : []);
    const desctopVersion = useAppSelector(desctopVersionSelect);
    const listType = desctopVersion ? 'picture-card' : 'picture';

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        const newFile = file;

        if (!file.url && !file.preview)
            newFile.preview = await getBase64(file.originFileObj as RcFile);

        setPreviewImage(newFile.url || (newFile.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            newFile.name ||
                newFile.url?.substring((newFile.url?.lastIndexOf('/') as number) + 1) ||
                '',
        );
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        if (newFileList[0].error?.status === 409) {
            newFileList[0].status === 'error';
            setFileList(errorFile);
            setIsBigFileError(true);
        } else {
            setIsBigFileError(false);
        }
    };

    const uploadButton = (
        <>
            {desctopVersion ? (
                <div>
                    <PlusOutlined />
                    <div>
                        <Text type='secondary'>
                            Загрузить
                            <br /> фото
                            <br /> профиля
                        </Text>
                    </div>
                </div>
            ) : (
                <div className={style.upliad_mobile}>
                    <div className={style.text}>
                        <Text>Загрузить фото профиля:</Text>
                    </div>

                    <Button
                        icon={<UploadOutlined style={{ color: 'gray' }} />}
                        block
                        className={style.upload_btn}
                        size='large'
                    >
                        <span>Загрузить</span>
                    </Button>
                </div>
            )}
        </>
    );

    const shouldShowPreview = fileList.length;
    return (
        <>
            <Form.Item name='imgSrc' data-test-id='profile-avatar'>
                <Upload
                    className={style.upload}
                    name='file'
                    maxCount={1}
                    action={`${URL}${AxiosPaths.UPLOAD_IMAGE}`}
                    headers={{ authorization: `Bearer ${token}` }}
                    listType={listType}
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    accept='image/*'
                    progress={{ strokeWidth: 4, showInfo: false, size: 'default' }}
                >
                    {!shouldShowPreview && uploadButton}
                </Upload>
            </Form.Item>
            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                centered
            >
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>

            {isBigFileError && (
                <ClanedarNotVarificationModal
                    title='Файл слишком большой '
                    text='Выберите файл размером 5 МБ.'
                />
            )}
        </>
    );
};

export default ProfileUpload;
