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
        <>
            <Sidebar />
            <Navbar />
            <div>
                {/* 소개 하는 섹션 */}
                <div>
                   <Intro />
                </div>
                {/* 각종 컨텐츠 */}
                <div style={{display: 'flex'}}>
                    <Notice />
                    <RecentPost />
                </div>
                {/* 방명록 */}
                <div>
                    <Guestbook />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Main
