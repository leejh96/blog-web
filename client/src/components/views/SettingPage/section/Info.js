import React from 'react'
import styled from 'styled-components';
const InfoBox = styled.div`
    display : flex;
    box-sizing = border-box;
    height : 400px;
    border : 1px solid black;
    margin-bottom : 36px;
`;

const ImgBox = styled.div`
    width : 40%;
    box-sizing = border-box;
    height : 400px;
    
`;
const Infomation = styled.div`
    width : 60%;
    box-sizing = border-box;
    height : 400px;
    display : flex;
    flex-direction : column;
    justify-content : space-evenly;
    padding : 0 20px
`;

const Text = styled.div`
    padding-left : 10px;
    margin-bottom : 5px;
`;

const TextBox = styled.div`
    display : flex;
    align-items : center;
    box-sizing = border-box;
    border : 1px solid black;
    border-radius : 5px;
    height : 30px;
    padding :  10px 10px;
`;
function Info() {
    return (
        <InfoBox>
            <ImgBox><img src='https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile7.uf.tistory.com%2Fimage%2F24283C3858F778CA2EFABE' width='100%' height='100%'></img></ImgBox>
            <Infomation>
                <Text>이름</Text>
                <TextBox>이주혁</TextBox>
                <Text>닉네임</Text>
                <TextBox>leee</TextBox>
                <Text>이메일</Text>
                <TextBox>a@a</TextBox>
                <Text>등급</Text>
                <TextBox>관리자</TextBox>
            </Infomation>
        </InfoBox>
    )
}

export default Info
