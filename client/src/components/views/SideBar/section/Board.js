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
      fontSize : '0.9rem',
      fontWeight : 'bold'
    },
    titleDiv : {
      display : 'flex',
      justifyContent : 'space-between',
      margin : '0 0 10px 0',
      padding : 0,
    },

  }
})

const Category = () => {
  return [
    {
      tag : '공지사항',
      link : '/notice/1'
    },
    {
      tag : '방명록',
      link : '/guestbook/1'
    }
  ]
}

function Board() {
    const classes = useStyles();
    const [category, setCategory] = useState([]);
    useEffect(() => {
        setCategory(Category());
    }, [])
    return (
        <Box className={classes.area}>
            <Box className={classes.titleDiv}>
              <Typography variant='h4' className={classes.title}>Board</Typography>
            </Box>    
            {category.map((val, i) => (
                <Link key={i} to={val.link} className={classes.link}>{val.tag} </Link>
            ))}
        </Box>
    )
}

export default Board
