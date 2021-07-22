import React, { useState } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch  } from 'react-redux';
import { uploadImage } from '../../../../../../actions/UserAction';
// import upload from '../../../../../../../../server/upload';

const InfoBox = styled.div`
    display : flex;
    height : 400px;
    margin-bottom : 36px;
`;

const ImgBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    align-items : center;
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
    font-size : 1.5rem;
    font-weight : bold;
    color : #999999;
`;

const TextBox = styled.div`
    display : flex;
    box-sizing = border-box;
    border : 1px solid #c4c4c4;
    border-radius : 5px;
    height : 35px;
    padding :  10px 10px;
`;

const Upload = styled.input`
    display : none;
`;

const Label = styled.label`
    padding: 6px 25px;
    background-color:#c4c4c4;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover{
        background-color:#b4b4b4;

    }
`;

const BtnDiv = styled.div`
    display : flex;
    justify-content : space-between;
`;
function Info() {
    const user = useSelector(state => state.UserReducer.user);
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const formData = new FormData();
    const onChangeImage = async(e) => {
        await setImage(e.target.files[0]);
        await formData.append('file', image);
        await dispatch(uploadImage(formData))
        .then(res => {
            if(!res.data.success){
                return alert(res.data.message);
            }
        })
    }
    console.log(user);
    return (
        <InfoBox>
            <ImgBox>
                <img src={`/upload/${user.img}`} width='100%' height='80%' alt='이미지'></img>
                <div>
                    <form encType='multipart/form-data'>
                        <BtnDiv>
                            <Label htmlFor="input-file" id='label'>업로드</Label>
                            <Upload type="file" name='file' id="input-file" onChange={onChangeImage}/>
                        </BtnDiv>
                    </form>
                </div>
            </ImgBox>
            <Infomation>
                <Text>이름</Text>
                <TextBox>{user.username}</TextBox>
                <Text>닉네임</Text>
                <TextBox>{user.nick}</TextBox>
                <Text>이메일</Text>
                <TextBox>{user.email}</TextBox>
                <Text>등급</Text>
                <TextBox>{user.role === 3 ? '관리자' : '일반회원'}</TextBox>
            </Infomation>
        </InfoBox>
    )
}

export default Info
