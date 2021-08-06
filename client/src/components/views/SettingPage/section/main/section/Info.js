import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux';
import { uploadImage } from '../../../../../../actions/UserAction';
import { Button, Container, Box } from '@material-ui/core';
import { deleteImg } from '../../../../../../actions/UserAction';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        height : '400px',
        marginBottom : '36px',
    },
    imgBtn : {
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between',
        width : '40%',
        boxSizing : 'border-box',
        height : '400px',
    },
    infoArea : {
        width : '60%',
        boxSizing : 'border-box',
        height : '400px',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-between',
        padding : '0 20px'
    },
    text : {
        paddingLeft : '10px',
        marginBottom : '5px',
        fontSize : '1.5rem',
        fontWeight : 'bold',
        color : '#999999',
    },
    textBox : {
        display : 'flex',
        boxSizing : 'border-box',
        border : '1px solid #c4c4c4',
        borderRadius : '5px',
        height : '50px',
        padding : '10px 10px',
        alignItems : 'center'
    },
    upload : {
        display : 'none',
    },
    label :{
        padding: '6px 25px',
        backgroundColor:'#c4c4c4',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        '&:hover' : {
            backgroundColor:'#b4b4b4',
        }
    },
    btnArea : {
        display : 'flex',
        justifyContent : 'space-evenly',
    },
    imageArea : {
        display : 'flex',
        justifyContent : 'center',
        width : '100%',
        height : '80%',
    }
}))
function Info() {
    const classes = useStyles();
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
        if(user.img === ''){
            return ;
        }
        dispatch(deleteImg(user.img))
        .then(res => {
            if(res.data.success){
                return setPath('/api/img/basic.png');
            }
            return alert(res.data.message);
        })
    }
    return (
        <Container disableGutters className={classes.area}>
            <Box className={classes.imgBtn}>
                <Box className={classes.imageArea}>
                    <img src={path} alt='이미지' />
                </Box>
                <Box>
                    <form>
                        <Box className={classes.btnArea}>
                            <label className={classes.label} htmlFor="input-file" id='label'>업로드</label>
                            <input className={classes.upload} type="file" name='file' id="input-file" onChange={onChangeImage}/>
                            <Button variant='outlined' onClick={onClickDelete}>이미지 제거</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
            <Box className={classes.infoArea}>
                <Box className={classes.text}>이름</Box>
                <Box className={classes.textBox}>{user.username}</Box>
                <Box className={classes.text}>닉네임</Box>
                <Box className={classes.textBox}>{user.nick}</Box>
                <Box className={classes.text}>이메일</Box>
                <Box className={classes.textBox}>{user.email}</Box>
                <Box className={classes.text}>등급</Box>
                <Box className={classes.textBox}>{user.role === 3 ? '관리자' : '일반회원'}</Box>
            </Box>
        </Container>
    )
}

export default Info
