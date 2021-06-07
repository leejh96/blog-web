import React from 'react';
import Navbar from '../NavBar/Navbar';
import Footer from '../Footer/Footer';
import Intro from './section/Introduce';
import Guestbook from './section/Guestbook';
import Notice from './section/Notice';
import RecentPost from './section/RecentPost';
import Sidebar from '../SideBar/Sidebar';
function Main() {
    return (
        <div>
            <Sidebar />
            <Navbar />
            <div style={{
                margin : '20px 50px 20px 50px',
            }}>
                <div >
                    <Intro />
                </div>
                <div style={{display: "Grid"}}>
                    <Notice />
                    <RecentPost />
                </div>
                <div>
                    <Guestbook />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Main
