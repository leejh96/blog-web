import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Intro from './section/Introduce';
import Guestbook from './section/Guestbook';
import Notice from './section/Notice';
import RecentPost from './section/RecentPost';
import Sidebar from '../SideBar/Sidebar';
import { Divider } from '@material-ui/core';
function Main() {
    return (
        <>
            {/* header */}
            <header>
                <Navbar />
            </header>
            <Divider />
            {/* body */}
            <div style={{ display : 'flex', margin : '0 50px 0 50px'}}>
                <Sidebar />
                <div style={{ width : '100%'}}>
                    <div >
                        <Intro />
                    </div>
                    <Divider style={ { marginBottom : '14px'} }/>
                    <div style={{display : 'flex', justifyContent : 'space-around'}}>
                        <Notice />
                        <RecentPost />
                    </div>
                    <Divider style={ { marginTop : '14px'} }/>
                    <div>
                        <Guestbook />
                    </div>
                </div>
            </div>
            {/* footer */}
            <Divider style={ {margin : '0 0 14px 0'} }/>
            <footer>
                    <Footer />
            </footer>
        </>
    )
}

export default Main
