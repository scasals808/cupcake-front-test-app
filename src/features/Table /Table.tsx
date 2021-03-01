import {useTable} from "react-table";
import React from "react";
import {StateType} from "../../app/app-reducer";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 3px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
          width: 150px;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 3px solid black;
      border-right: 3px solid black;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }

    //td {
    //  background: red;
    //}
  }
`

export const Table = ({data}: { data: StateType[] }) => {

    const columns: any = React.useMemo(
        () => [
            {Header: 'Pair name/market', accessor: 'name'},
            {Header: 'First', accessor: 'first'},
            {Header: 'Second', accessor: 'second'},
            {Header: 'Third', accessor: 'third'}
        ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data,})

    return (
        <Styles>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    const minValue = Math.min(...Object.values(row.values).filter(el => typeof el === 'number'))
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return cell.value === minValue
                                    ? <td style={{background: '#2787f5'}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    : <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Styles>
    )
}
