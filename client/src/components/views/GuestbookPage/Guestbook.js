import React from 'react'
import styled from 'styled-components';
import Navbar from '../NavBar/Navbar';
import {Divider} from '@material-ui/core';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/Footer';
import Tablesection from './section/Tablesection';
import Pagenation from './section/Pagenation';
import Bookbox from './section/Bookbox';
import { useParams } from 'react-router-dom';
const MainPage = styled.div`
    margin-left : 10%;
    margin-right : 10%;
    display : flex;
`;
const ContentArea = styled.div`
    flex-direction : row;
    width : calc(100% - 200px);
    margin-left : 30px;
`;


function Guestbook() {
    document.title = 'GUESTBOOK'
    const page = useParams();
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <h2>방명록</h2>
                    <Tablesection page={page}/>
                    <Pagenation pageNumber={page}/>
                    <Bookbox />
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}


// connect는 컴포넌트를 Redux에 연결하는 또 다른 함수를 반환
// connect([option])(컴포넌트);
// option이 없을경우 즉, connect()(컴포넌트)일 경우 props.store 로 접근가능
// option의 종류 mapStateToProps, MapDispatchToProps, mergeProps, options
// mapStateToProps, MapDispatchToProps, mergeProps 는 함수형태의 파라미터
// 즉 props.store.getState().~~가 아닌 자신이 설정한 변수로 값을 가져오고 싶을때 설정

// mapStateToProps는 state를 파라미터로 가지면서 state를 해당 컴포넌트의 props로 연결
// 이때 state는 redux에 있는 state이다 컴포넌트의 state 아님
// redux store의 state값이 변할 때마다 실행

// MapDispatchToProps 는 dispatch를 파라미터로 가지면서 dispatch한 함수를
// 해당 컴포넌트의 props로 연결

// mergeProps는 state와 dispatch를 파라미터로 가지면서 컴포넌트에 연결해야할
// props가 state와 dispatch를 동시에 사용해야 할 때 사용, 많이 사용x 



// options 는 { pure = true, withRef = false} 등이 있다.
// pure를 true로 주면 불필요한 업데이트를 안함 default 는 true,
// withRef가 true라면 redux에 연결된 컴포넌트를 ref에 담아서 getWrappedInstance()
// 함수를 통해서 접근할 수 있도록 한다. 거의 사용 x  default는 false


export default Guestbook;
