import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { createStudy, loadStudy, deleteStudy } from '../../../../actions/StudyAction';

const SideMain = styled.div`
  display : flex;
  flex-direction : column;
  padding : 10px 10px 0 30px
`;
const SideLink = styled(Link)` //react-router-dom 태그는 ()에 넣는다
  text-decoration : none;
  margin-bottom : 3px;
  color : black;
  &:hover{
    color : #999999;
    text-decoration : underline;
  };
`;
const MenuTitle = styled.h4`
  margin : 0;
`;

const MenuTitleDiv = styled.div`
  display : flex;
  justify-content : space-between;
  margin : 0 0 10px 0;
  padding : 0;
`;
const DeleteBtn = styled.button`
  padding : 0;
  margin : 0;
  background-color : #ffffff;
  border :0;
  cursor : pointer;
`;
const PlusBtn = styled.button`
  padding : 0;
  margin : 0;
  background-color : #ffffff;
  border :0;
  cursor : pointer;
  &:hover{
    border : 1.5px groove #eeeeee;
  }
`;

const PlusFieldDiv = styled.div`
  margin-bottom : 10px;
  display : flex;
  justify-content : space-between;
`;

const Text = styled.input`
  padding : 0;
  margin :0;
  width : 70%;
`;

const CreateBtn = styled.button`
  padding : 0 2px;
  margin : 0;
  cursor : pointer;
`;

const StudyDiv = styled.div`
  display : flex;
  justify-content : space-between;
`;

function Study() {
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
        <SideMain>
            <MenuTitleDiv>
            <MenuTitle>Study</MenuTitle>
            {user.role === 3 ? 
              <PlusBtn onClick={onClickPlusBtn}>+</PlusBtn>
              :
              <></>
            }
            </MenuTitleDiv>
            { toggle?
            <PlusFieldDiv>
                <Text onChange={onChangeText} placeholder='추가항목 입력'/>
                <CreateBtn onClick={onClickStudyCreateBtn}>추가</CreateBtn>
            </PlusFieldDiv>
            :
            <></>
            }
            {study.map((val, i) => (
            <StudyDiv key={val._id}>
                <SideLink to={val.link} >
                {val.subject}
                </SideLink>
                {user.role === 3 ? 
                  <DeleteBtn onClick={() => onClickDeleteBtn(val._id)}>x</DeleteBtn>
                  :
                  <></>
                }
            </StudyDiv>
            ))}
      </SideMain>
    )
}

export default Study
