import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core'
function Guestbook() {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan='2'  style={{ textAlign : 'center'}}>
                            방명록
                        </TableCell>
                    </TableRow>    
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            닉네임
                        </TableCell>
                        <TableCell>
                            하이
                        </TableCell>
                    </TableRow> 
                </TableBody>
            </Table>
        </div>
    )
}

export default Guestbook
