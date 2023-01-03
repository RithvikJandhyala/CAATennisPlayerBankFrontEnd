import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import MatchService from '../services/MatchService';
import TableScrollbar from 'react-table-scrollbar';
import {CSVLink} from 'react-csv';
import win from "./images/check.png";
import * as B from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import { GlobalFilter } from './GlobalFilter';
import SchoolService from '../services/SchoolService';
const MatchesSummaryReactTable=()=>{ 
  const [data,setMatchesDaySummary]=useState([]);
  useEffect(()=>{
      MatchService.getMatchesDaySummary().then((response) => {           
          setMatchesDaySummary(response.data);
      });

  },[]);

  const columns = React.useMemo(
    () => [
        {
            Header: 'Match Date',
            accessor: 'matchDate',        
          },
          {
            Header: 'Division',
            accessor: 'division',        
          },
          {
            Header: 'Home Team',
            accessor: 'homeTeam',
            Cell: tableProps => (
              <div>
                <div>             
                    <img  src= {require('./images/'+SchoolService.getSchoolImg(tableProps.row.original.homeTeam))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' /> 
                    {tableProps.row.original.homeTeam}
                    {(tableProps.row.original.homeTeamPoints > tableProps.row.original.awayTeamPoints )?
                    <img  src= {win} style={{ width: 15, height:15,marginLeft:7 }} className = 'player1' />:
                    <></>
                  }  
                </div>
                <div>  
                  
                </div> 
                </div> ),             
          },
          {
            Header: 'Home Team Points',
            accessor: 'homeTeamPoints',
          },
          {
            Header: 'Away Team',
            accessor: 'awayTeam',
            Cell: tableProps => (
                <div>             
                    <img  src= {require('./images/'+SchoolService.getSchoolImg(tableProps.row.original.awayTeam))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' /> 
                    {tableProps.row.original.awayTeam}
                    {(tableProps.row.original.awayTeamPoints > tableProps.row.original.homeTeamPoints )?
                    <img  src= {win} style={{ width: 15, height:15,marginLeft:7 }} className = 'player1' />:
                    <></>
                  }  
                </div> ),              
          },
          {
            Header: 'Away Team Points',
            accessor: 'awayTeamPoints',     
          },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data  },useGlobalFilter)

  const {globalFilter} = state
  return (
    <div>
         <h1 className = "text-center"><B.MdSportsTennis style={{ marginBottom: 10 ,marginRight: 5}}/>Matches Summary</h1>
         <div style={{float:"right",paddingRight:10}}>
          <CSVLink data = {data} filename = 'AllPlayers'> <button type="button" className = "btn btn-primary mb-2">  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5}}/>Download</button> </CSVLink>
        </div>         
        <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter}/>
       {// <TableScrollbar height = "70vh"  style={{ marginBottom: 10 ,marginRight: 5,border:'1px solid'}}>
        }
        <div style={{ maxWidth: '99.9%' }}>
          <>
          
        <table {...getTableProps()} className = "table table-striped" style ={{height:20}}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()} style = {{background: 'white'}}> {column.render('Header')} </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        </>
        </div>
      {//</TableScrollbar>
}
    </div>
  )
}
export default MatchesSummaryReactTable;