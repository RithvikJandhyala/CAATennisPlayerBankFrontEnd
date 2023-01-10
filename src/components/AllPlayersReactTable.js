import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import PlayerService from '../services/PlayerService';
import pic from "./images/player1.png";
import Doubles from "./images/doubles.png";
import {CSVLink} from 'react-csv';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import { GlobalFilter } from './GlobalFilter';
import SchoolService from '../services/SchoolService';
const AllPlayersReactTable=()=>{ 
  const [data,setPlayers]=useState([]);
  useEffect(()=>{
      PlayerService.getPlayers().then((response) => {           
          setPlayers(response.data);
      });

  },[]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Division',
        accessor: 'division',        
      },
      {
        Header: 'Type',
        accessor: 'playerType',        
      },
      {
        Header: 'Player ID',
        Cell: tableProps => (
          <div>  
            {(tableProps.row.original.playerType === 'Singles')?
              <img  src= {pic} style={{ width: 30, height:30 }} className = 'player1' />:
              <img  src= {Doubles} style={{ width: 35, height:35 }} className = 'player1' />
            }
            {tableProps.row.original.playerID}  
          </div> 
        ),
        accessor: 'playerID', 
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'School',
        Cell: tableProps => (
          <div>             
              <img  src= {require('./images/'+SchoolService.getSchoolImg(tableProps.row.original.school))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' /> 
              {tableProps.row.original.school}  
          </div> ),
        accessor: 'school',
      },
      {
        Header: 'Ranking',
        accessor: 'ranking', 
        
        
      },
      {
        Header: 'Wins',
        Cell: tableProps => (
          <div style={{ color: "green" }}> {tableProps.row.original.wins} 
          </div> 
        ),
        accessor: 'wins',
      },
      {
        Header: 'Losses',
        Cell: tableProps => (
          <div style={{ color: "red" }}> {tableProps.row.original.losses} 
          </div> 
        ),
        accessor: 'losses', 
      }
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
        <h1 className = "text-center"><RiIcons.RiTeamLine style={{ marginBottom: 10 ,marginRight: 5}}/>All Players</h1>
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
export default AllPlayersReactTable;