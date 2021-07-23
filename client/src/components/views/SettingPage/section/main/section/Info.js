import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch  } from 'react-redux';
import { uploadImage } from '../../../../../../actions/UserAction';
import { Button } from '@material-ui/core';
import { deleteImg } from '../../../../../../actions/UserAction';
const InfoBox = styled.div`
    display : flex;
    height : 400px;
    margin-bottom : 36px;
`;

const ImgBox = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
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
    justify-content : space-evenly;
`;

const Image = styled.div`
    display : flex;
    justify-content : center;
    width : 100%;
    height : 80%;
`;
function Info() {
    const [path, setPath] = useState('/api/img/basic.png');
    const user = useSelector(state => state.UserReducer.user);
    const dispatch = useDispatch();
    useEffect(() => {
        user.img ? setPath(`/api/img/${user.img}`) : setPath(`/api/img/basic.png`)
    }, [user])
    const onChangeImage = (e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        dispatch(uploadImage(formData))
        .then(res => {
            if(!res.data.success){
                return alert(res.data.message);
            }
            return setPath(`/api/img/${res.data.file}`);
        })
    }

    const onClickDelete = () => {
        dispatch(deleteImg(user.img))
        .then(res => {
            if(res.data.success){
                return setPath('/api/img/basic.png');
            }
            return alert(res.data.message);
        })
    }
    return (
        <InfoBox>
            <ImgBox>
                <Image>
                    <img src={path} alt='이미지'></img>
                </Image>
                <div>
                    <form>
                        <BtnDiv>
                            <Label htmlFor="input-file" id='label'>업로드</Label>
                            <Upload type="file" name='file' id="input-file" onChange={onChangeImage}/>
                            <Button variant='outlined' onClick={onClickDelete}>이미지 제거</Button>
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
