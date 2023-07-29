import Header from 'components/Header/Header';
import useDocumentTitle from 'hooks/useDocumentTitle';

import './Home.scss';

function Home() {
    useDocumentTitle('OutClimb');

    return (
        <>
            <Header />
        </>
    );
}

export default Home;
