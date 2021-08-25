import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from  'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { PaginationItem } from '@material-ui/lab'
import MaterialPagination from '@material-ui/lab/Pagination'

const useStyles = makeStyles(theme => ({
    area : {
        display : 'flex',
        justifyContent : 'center',
        marginBottom : '30px',
    }
}))

const pageCount = (cnt) => {
    let remainder = cnt % 10 ? 1 : 0 ;
    let pageCnt = parseInt(cnt / 10) + remainder;
    return pageCnt;
}

function Pagination() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [pageCnt , setPageCnt] = useState(1);
    const guestbookLength = useSelector(state => state.GuestbookReducer.guestlength);
    const paramsPage = parseInt(useParams().id);
    const history = useHistory();

    useEffect(() => {
        const pages = pageCount(guestbookLength);
        if(pages !== 0 && (paramsPage > pages || isNaN(paramsPage))){
            return history.push('/Notfound');
        }
        if(pages !== 0 && paramsPage === 0){
            return history.push('/guestbook/1')
        }
        setPageCnt(pages)
    }, [guestbookLength, paramsPage, history]);

    const onChangeButton = (e, v) => {
        setPage(v);
    };

    return (
        <Box className={classes.area}>
            <MaterialPagination size='small' color='primary' page={page} onChange={onChangeButton} count={pageCnt} showFirstButton showLastButton 
                renderItem={(item) => ( 
                <PaginationItem
                    component={Link}
                    to={`/guestbook/${item.page}`}
                    {...item} 
                />)}
            />
        </Box>
    )
}

export default Pagination
