import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    area : {
      display : 'flex',
      flexDirection : 'column',
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
      fontSize : '1rem',
    },
  }
})
const Category = () => {
  return [
    {
      tag : '닉네임 변경',
      link : '/setting/nick'
    },
    {
      tag : '비밀번호 변경',
      link : '/setting/password'
    },
    {
      tag : '회원 탈퇴',
      link : '/setting/resign'
    }
  ]
}

function Setting() {
    const classes = useStyles();
    const [category, setCategory] = useState([]);
    const [toggle, setToggle] = useState(false);
    useEffect(() => {
        setCategory(Category());
    }, []);

    const onClickBtn = () => {
        if(toggle){
            setToggle(false);
        }else{
            setToggle(true);
        }
    }
    return (
        <Fragment>
            <Box>
                <Button onClick={onClickBtn} variant='text' className={classes.title}>목록</Button>
            </Box> 
        {           
            toggle ?
            <Box className={classes.area}>
                {
                    category.map((val, i) => (
                        <Link className={classes.link} key={i} to={val.link}>{val.tag} </Link>
                    ))
                }
            </Box>
        :
            <Fragment>
            </Fragment>
        
        }
        </Fragment>
    )
}

export default Setting
