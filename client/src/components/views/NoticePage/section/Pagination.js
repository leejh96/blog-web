// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from  'react-router-dom';
import {useSelector} from 'react-redux';
import MaterialPagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem'; 
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => {
    return {
        area : {
            display : 'flex',
            justifyContent : 'center',
            marginBottom : '30px',
        }
    }
})
const pageCount = (cnt) => {
    let remainder = cnt % 10 ? 1 : 0 ;
    let pageCnt = parseInt(cnt / 10, 10) + remainder;
    return pageCnt;
}

function Pagination() {
    const classes = useStyles();
    const noticesCount = useSelector(state => state.NoticeReducer.notices).length;
    const [pageCnt , setPageCnt] = useState(1);
    const [page, setPage] = useState(1);
    const paramsPage = parseInt(useParams().page, 10);
    const history = useHistory();
    
    useEffect(() => {
        const pages = pageCount(noticesCount);
        if(pages !== 0 && (paramsPage > pages || isNaN(paramsPage))){
            return history.push('/Notfound');
        }
        if(pages !== 0 && paramsPage === 0){
            return history.push('/notice/1')
        }
        setPageCnt(pages);
    }, [noticesCount, history, paramsPage])

    const onChangeButton = (e, value) => { //material에선 e.target.value가 아닌 그냥 value를 불러와서 쓴다
        setPage(value);
    }
    return (
        <Box className={classes.area}>
            <MaterialPagination size='small' color='primary' page={page} onChange={onChangeButton} count={pageCnt} showFirstButton showLastButton 
                renderItem={(item) => ( 
                <PaginationItem
                    component={Link}
                    to={`/notice/${item.page}`}
                    {...item} 
                />)}
            />
        </Box>
    )
}

export default Pagination
