import React from 'react'
import Navbar from '../NavBar/Navbar';
import Sidebar from '../SideBar/Sidebar';
import Footer from '../Footer/Footer';
import TableSection from './section/TableSection';
import Pagenation from './section/Pagenation';
import {Divider} from '@material-ui/core';
function Notice() {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <Divider />
            {/* body */}
            <div style={{ display : 'flex', margin : '0 50px 0 50px'}}>
                <Sidebar />
                <div>
                    <h2>공지사항</h2>
                    <TableSection />
                    <Pagenation />
                </div>
            </div>
            <Divider style={ {margin : '0 0 14px 0'} }/>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Notice
