import { Divider } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
function Sidebar() {
  const list1 = ['NodeJS','React','MongoDB','MySQL','HTML', 'CSS', 'JavaScript']
  const list2 = ['공지사항', '개발일지', '최근이슈'];
  const list2Link = ['/notice', '/diary', '/issue'];
  
  return (
    <div style={{
        width : '200px',
        marginRight : '50px',
        borderRight : '1px solid Gainsboro'
    }}>
      <h3 style={{
        textAlign : 'center',
        paddingRight : '50px'
      }}>메뉴</h3>
      <ul style={{ 
        listStyle: 'none',
        padding: 0,
        margin : 0,
        paddingRight : '10px'
      }}>
        {list2.map((val, i) => (
          <li key={i} style={{ marginBottom : '5px'}}>
          <Link to = {list2Link[i]} style ={{
            textDecoration : 'none', color : 'black'
          }}>{val}</Link></li>
        ))}
        <Divider />
        {list1.map((val, i) => (
          <li key={i} style={{ marginBottom : '5px'}}>
            <Link to = {`/${list1[i]}`} style ={{
              textDecoration : 'none', color : 'black'
            }}>{val}</Link></li>
        ))}
      </ul> 
    </div>
  )
}

export default Sidebar
