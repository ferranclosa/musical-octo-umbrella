import React , { useState, useRef, useEffect, forwardRef } from 'react'

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useRowSelect, useTable, useSortBy } from 'react-table'
import { makeStyles } from '@material-ui/core/styles'
import {CheckBox} from "@material-ui/icons";


const IntederminateCheckBox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef()
        const resolvedRef = ref || defaultRef
        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])
        return (
            <>
                <CheckBox ref={resolvedRef} {...rest} />
                </>
        )
    }
)

const useStyles = makeStyles((theme) =>({
    formControl :{
        margin: theme.spacing(1),
        minWidth: 200,
        marginTop: theme.spacing(2)
    },
   padding: 0,
   margin: 0,
   border: 0,
   background: 'transparent'
}))

function EnhancedTable ({columns, data, setSelectedRows , ...props}){
    const classes = useStyles()
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
        } = useTable({
        columns,
        data,
        initialState: {
           hiddenColumns: 'id'
        }
    }, useSortBy,
        useRowSelect
    )
    useEffect(() =>{
        setSelectedRows(selectedFlatRows.map(row => row.original))
    },[setSelectedRows, selectedFlatRows])

    const removeByIndexes = (array, indexs) =>
        array.filter((_, i) => !indexs.includes(i))

    return (
        <TableContainer justify='flex-start' spacing={1} >
            <MaUTable {...getTableProps()} size='small' >
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell >
                                    {column.render('Header')}
                                    {column.id !== 'selection' ? (
                                        <TableSortLabel active={column.isSorted}
                                                        direction={column.isSortedDesc ? 'desc' : 'asc'}/>
                                    ) : null }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row, i ) => {
                        prepareRow(row)
                        return (
                            <TableRow
                                {...row.getRowProps()}
                                style={i %2 ? {bakground: 'ligh-grey'} : {background: 'white'}}
                                key={i}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell headers={{...cell.getCellProps()}}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>


                        )
                    })}
                </TableBody>
            </MaUTable>
        </TableContainer>
)
}
export default EnhancedTable