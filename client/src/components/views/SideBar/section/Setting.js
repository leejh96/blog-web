import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

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
      fontSize : '1rem',
    },
    titleDiv : {
      display : 'flex',
      justifyContent : 'space-between',
      margin : '0 0 10px 0',
      padding : 0
    }
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
    useEffect(() => {
        setCategory(Category());
    }, [])
    return (
        <Box className={classes.area}>
            <Box className={classes.titleDiv}>
                <Typography variant='h4' className={classes.title}>목록</Typography>
            </Box>    
            {category.map((val, i) => (
                <Link className={classes.link} key={i} to={val.link}>{val.tag} </Link>
            ))}
        </Box>
    )
}

export default Setting
