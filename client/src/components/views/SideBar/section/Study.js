import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStudy, loadStudy, deleteStudy } from '../../../../actions/StudyAction';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, IconButton, TextField, Typography } from '@material-ui/core'
import { Delete, Create } from '@material-ui/icons'
const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            flexDirection : 'column',
            padding : '10px 10px 0 30px',
        },
        link : {
            textDecoration : 'none',
            marginBottom : '3px',
            color : 'black',
            '&:hover' : {
                color : '#999999',
                textDecoration : 'underline',
        },
        },
        title : {
            margin : 0,
            fontWeight : 'bold',
            fontSize : '0.9rem'
        },
        titleDiv : {
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
            margin : '0 0 10px 0',
            padding : 0,
        },
        plusBtn : {
            padding : 0,
            margin : 0,
            border :0,
        },
        plusField : {
            marginBottom : '10px',
            display : 'flex',
            justifyContent : 'space-between',
        },
        deleteBtn : {
            padding : 0,
            margin : 0,
            border : 0,
        },
        text : {
            padding : '0',
            margin : '0',
            width : '70%'
        },
        createBtn : {
            padding : '0 2px',
            margin : 0,
        },
        studyDiv : {
            display : 'flex',
            justifyContent : 'space-between',
            alignItems : 'center',
        }
    }
})
function Study() {
    const classes = useStyles();
    const [toggle, setToggle] = useState(false);
    const [text, setText] = useState('');
    const [study, setStudy] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { studyCount } = useSelector(state => ({
      studyCount : state.StudyReducer.studyCount
    }))
    const user = useSelector(state => state.UserReducer.user);
    useEffect(() => {
      dispatch(loadStudy())
        .then(res => {
            setStudy(res.data);
        })
        return () => {
            setToggle(false)
            setText('')
            setStudy([])
        }
    }, [dispatch, studyCount])

    const onChangeText = (e) => {
        setText(e.target.value);
    }
    const onClickPlusBtn = () => {
        toggle ? 
        setToggle(false)
        :
        setToggle(true)
    }
    const onClickStudyCreateBtn = () => {
        dispatch(createStudy(text))
        .then(setToggle(false))
    };
    const onClickDeleteBtn = (id) => {
        if(window.confirm('삭제 하시겠습니까?')){ 
            return dispatch(deleteStudy(id))
            .then(history.push('/'))      
        }
    };

    return (
        <Box className={classes.area}>
            <Box className={classes.titleDiv}>
              <Typography className={classes.title}>Study</Typography>
              {user.role === 3 ? 
                <IconButton size='small' onClick={onClickPlusBtn}>
                  <Create />
                </IconButton>
                :
                <></>
              }
            </Box>
            { toggle?
            <Box className={classes.plusField}>
                <TextField size='small' variant='outlined' className={classes.text} onChange={onChangeText} placeholder='추가항목 입력'/>
                <Button size='small' variant='outlined' className={classes.createBtn} onClick={onClickStudyCreateBtn}>추가</Button>
            </Box>
            :
            <></>
            }
            {study.map((val, i) => (
            <Box className={classes.studyDiv} key={val._id}>
                <Link to={val.link} className={classes.link}>
                  {val.subject}
                </Link>
                {user.role === 3 ? 
                  <IconButton size='small' onClick={() => onClickDeleteBtn(val._id)}>
                    <Delete />
                  </IconButton>
                  :
                  <></>
                }
            </Box>
            ))}
      </Box>
    )
}

export default Study
