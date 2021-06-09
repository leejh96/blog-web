import React from 'react'
import {Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
function TableSection() {
    const styleCss = {
        TableCell : {
            textAlign : 'center'
        }
    }
    return (
        <div align='center'>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell style={styleCss.TableCell}>번호</TableCell>
                        <TableCell style={styleCss.TableCell}>제목</TableCell>
                        <TableCell style={styleCss.TableCell}>작성자</TableCell>
                        <TableCell style={styleCss.TableCell}>작성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell style={styleCss.TableCell}>1</TableCell>
                        <TableCell style={styleCss.TableCell}>안녕하세요</TableCell>
                        <TableCell style={styleCss.TableCell}>관리자</TableCell>
                        <TableCell style={styleCss.TableCell}>2021-06-09</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default TableSection
