import React from 'react';
import Main from './section/main/Main';
import Change from './section/change/Change';
import { useParams } from 'react-router-dom';

function Setting() {
    document.title = 'SETTING'
    const params = useParams();
    return (
        <>
            {!params.change ? <Main /> : <Change />}
        </>
    )
}

export default Setting;