import React from 'react'
import styled from 'styled-components';
import Navbar from '../NavBar/Navbar';
import {Divider} from '@material-ui/core';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/Footer';
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
const Content = styled.div`
    display : flex;
    justify-content : space-around;
    flex-wrap : wrap;
    align-content : flex-start
`;

const DiaryTitle = styled.h2`
    
`;

const DiaryGrid = styled.div`
    box-sizing: border-box;
    width : 30%;
    height : 400px;
    border : 1px solid black;
    margin-bottom : 5%;
    border-radius : 10%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow : 10px 10px 5px rgba(0, 0, 0, 0.3);
    transition : all 0.3s;
    &:hover{
        transform : scale(1.05);
        cursor : pointer;
    }
`;
function Diary(props) {
    const diary = [
        {
            type : 'Express',
            img : 'https://grm-project-template-bucket.s3.ap-northeast-2.amazonaws.com/lesson/les_lrcKl_1533200827869/786d30e016fad2cb7dc2c76af86d55f6afd277dd5a8a80dd17b13332bfe0131f.png',
            link : '/diary/Express'
        },
        {
            type : 'React',
            img : 'https://images.velog.io/images/jkzombie/post/6d17a7a4-9c50-42b4-96a1-ad6bb3bb1b5a/1200px-React-icon.svg.png',
            link : '/diary/React'
        },
        {
            type : 'MySQL',
            img : 'https://media.vlpt.us/images/sgh002400/post/005be64e-a3e4-4535-9b97-72876a30ef97/MySQL.png',
            link : '/diary/MySQL'
        },
        {
            type : 'MongoDB',
            img : 'https://media.vlpt.us/images/theagri/post/149627da-a3f9-4619-af93-4f8c5128c548/mongodb.png',
            link : '/diary/MongoDB'
        },
        {
            type : 'HTML',
            img : 'https://media.vlpt.us/images/jacoblee19/post/37558a06-0678-4657-adb2-e1e957e6d8f0/html.webp',
            link : '/diary/HTML'
        },
        {
            type : 'CSS',
            img : 'https://t1.daumcdn.net/cfile/tistory/2342BA3A5784D5D034',
            link : '/diary/CSS'
        },
        {
            type : 'JavaScript',
            img : 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
            link : '/diary/JavaScript'
        },
    ];
    const onClickGrid = (link) => {
        return props.history.push(link);
    };
    return (
        <>
            <Navbar />
            <Divider />
            <MainPage>
                <Sidebar />
                <ContentArea>
                    <DiaryTitle>개발일지</DiaryTitle>
                    <Content>
                        {diary.map((val, idx) => (
                            <DiaryGrid key={idx}  style={{backgroundImage : `url(${val.img})`}} onClick={() => {return onClickGrid(val.link)}}></DiaryGrid>
                        ))}
                    </Content>
                </ContentArea>
            </MainPage>
            <Footer />
        </>
    )
}

export default Diary
