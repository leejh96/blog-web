import React from 'react'
import styled from 'styled-components';

const IntroArea = styled.div`
    height : 300px;
    border-bottom : 1px solid #eeeeee;
    padding : 10px 0 10px 0;
`;
const IntroTitle = styled.h2`
    text-align : center;
    margin : 20px 0 20px 0;
`;
const IntroImg = styled.img`
    width: 200px;
    height: 200px;
    float: left;
    margin-right : 20px
`;
const IntroText = styled.p`
    white-space : nowrap;
    text-align: 'left';
    font-size : 1.5rem;
    margin : 0;
`;
function Introduce() {
    const imgAddress = 'https://officen.azureedge.net/upload/editor/b26ade75-1e49-4082-8a3f-1d95299d86bb.jpg'
    return (
        <IntroArea>
            <IntroTitle> 간단한 자기소개 </IntroTitle>
            <IntroImg src={imgAddress} alt='blogger image' />
            <IntroText> 
                안녕하세요 블로그 개설자 이주혁 입니다.<br />
                <b>공부 목적으로 만들어진 블로그 입니다.</b><br />
                제가 아는 것을 알려드리고 잘못되거나 모르는 것은 같이 공유하는 <br />
                그런 블로그가 되었으면 합니다.<br />
                찾아주셔서 감사드리고 오늘 하루도 좋은 시간 보내셨으면 좋겠습니다~!!
            </IntroText>
        </IntroArea>
    )
}

export default Introduce
