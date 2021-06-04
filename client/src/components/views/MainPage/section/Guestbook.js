import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, } from '@material-ui/core'
function Guestbook() {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            방명록
                        </TableCell>
                    </TableRow>    
                </TableHead>
                <TableBody>
                    <TableRow>
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
