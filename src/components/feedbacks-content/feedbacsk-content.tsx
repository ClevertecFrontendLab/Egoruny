import { Layout, Button, Typography } from 'antd';
import style from './feedbacsk-content.module.css';
import { useState } from 'react';
import UserComment from '@components/user-comment/user-comment';
import { usersFeedbacks, feedbacksErrorSelect } from '@redux/slise/select';
import { postFeedbacksStart } from '@redux/slise/post-feedbakc-slise';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { sortFeedbakcsByDate } from '@utils/constans/sort';
import ErrorModal from '@pages/feedbacks-page/modals/error-modals/error-modals';
import PostFeedbakcModal from '../../pages/feedbacks-page/modals/post-feedbakc-modal/post-feedbakc-modal';
import EmpptyFeedbakcs from '@pages/feedbacks-page/empty-feedbakcs/empty-feedbakc';

const { Content, Footer } = Layout;
const { Title } = Typography;

const FeedbacksContent: React.FC = () => {
    const dispatch = useAppDispatch();
    const feedBack = useAppSelector(usersFeedbacks);

    const [isHiden, setHiden] = useState(false);
    const feedbakcs = sortFeedbakcsByDate(useAppSelector(usersFeedbacks));
    const feeedbackError = useAppSelector(feedbacksErrorSelect);
    const [openModal, setOpenModal] = useState(false);
    const getAllFeedbacks = () => (isHiden ? feedbakcs : feedbakcs.slice(0, 4));

    const handleopenModal = () => setOpenModal(true);
    const hadleSubmit = ({ message, rating }) => dispatch(postFeedbacksStart({ message, rating }));

    return (
        <>
            {feeedbackError && <ErrorModal />}
            <PostFeedbakcModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                hadleSubmit={hadleSubmit}
            />
            {feedBack.length ? (
                <Content className={style.feedbacks_content_wrapper}>
                    <div
                        className={style.feedbacks_content}
                        style={{
                            flexDirection: isHiden ? 'column-reverse' : 'column',
                        }}
                    >
                        {getAllFeedbacks().map(
                            ({ id, fullName, imageSrc, createdAt, message, rating }) => (
                                <UserComment
                                    key={id}
                                    fullName={fullName}
                                    image={imageSrc}
                                    message={message}
                                    rating={rating}
                                    createdAt={createdAt}
                                />
                            ),
                        )}
                    </div>
                    <Footer className={style.footer_feedbaks}>
                        <Button
                            data-test-id='write-review'
                            type='primary'
                            className={style.feedbacks_btn}
                            onClick={handleopenModal}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            onClick={() => setHiden(!isHiden)}
                            type='text'
                            data-test-id='all-reviews-button'
                        >
                            <Title level={5} style={{ color: '#2F54EB' }}>
                                {!isHiden ? 'Развернуть все отзывы' : 'Свернуть отзывы'}
                            </Title>
                        </Button>
                    </Footer>
                </Content>
            ) : (
                <EmpptyFeedbakcs setOpenModal={setOpenModal} />
            )}
        </>
    );
};

export default FeedbacksContent;
