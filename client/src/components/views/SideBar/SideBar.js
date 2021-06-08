import React from 'react'
import { Link} from 'react-router-dom';
function Sidebar() {
  const list = ['NodeJS','React','MongoDB','MySQL','HTML', 'CSS', 'JavaScript']
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
        {list.map((val, i) => (
          <li key={i} style={{ marginBottom : '5px'}}>
            <Link to = {`/${list[i]}`} style ={{
              textDecoration : 'none', color : 'black'
            }}>{val}</Link></li>
        ))}
      </ul> 
    </div>
  )
}

export default Sidebar
