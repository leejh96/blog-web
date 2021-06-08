import React from 'react'
import {Divider} from '@material-ui/core'
function Introduce() {
    return (
        <div style={{textAlign: 'left', borderBottom : '1px soild black'}}>
            <h2> 간단한 자기소개 </h2>
            <p style={ {fontSize : '1rem'}}> 
                안녕하세요 블로그 개설자 이주혁 입니다.<br />
                <b>공부 목적으로 만들어진 블로그 입니다.</b><br />
                제가 아는 것을 알려드리고 잘못되거나 모르는 것은 같이 공유하는 <br />
                그런 블로그가 되었으면 합니다.<br />
                찾아주셔서 감사드리고 오늘 하루도 좋은 시간 보내셨으면 좋겠습니다~!!
            </p>
        </div>

    )
}

export default Introduce
