import { Layout } from 'antd';
import CardsDiscriptions from '@components/cards-discriptions/cards-discriptions';
import Cards from '@components/cards-begin-taining/cards-begin-taining';
import FooterContent from '@components/footer-content/footer-content';
import Header from '@components/header/header';
import { useAppSelector, useAppDispatch } from '@redux/configure-store';
import { myTreningsErrorSelect, traningListErrorSelect } from '@redux/slise/select';
import ErrorModal from '@pages/feedbacks-page/modals/error-modals/error-modals';
const { Content } = Layout;

const MainContent: React.FC = () => {
    const myTreningListError = useAppSelector(myTreningsErrorSelect);
    const calendarTreningListError = useAppSelector(traningListErrorSelect);
    return (
        <>
            <ErrorModal />
            <Header />
            <Content>
                <CardsDiscriptions />
                <Cards />
            </Content>
            <FooterContent />
        </>
    );
};

export default MainContent;
