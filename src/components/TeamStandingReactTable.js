import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import MatchService from '../services/MatchService';
import {CSVLink} from 'react-csv';
import * as BsIcons from 'react-icons/bs';
import * as SiIcons from 'react-icons/si';
import { GlobalFilter } from './GlobalFilter';
import SchoolService from '../services/SchoolService';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";
const TeamStandingReactTable=()=>{ 
    const [data,setTeamStandings]=useState([]);
    const [loading,setLoading] = useState(false);
  useEffect(()=>{
    async function fetchData() {
     
      setLoading(true);
      await MatchService.getTeamStanding().then((response) => {           
        setTeamStandings(response.data);
      });
      setLoading(false);  
    }
    fetchData();    
  },[]);

  const columns = React.useMemo(
    () => [
          {
            Header: 'Division',
            accessor: 'division',        
          },
          {
            Header: 'Team',
            accessor: 'name',
            Cell: tableProps => (
                <div>             
                    <img  src= {require('./images/'+SchoolService.getSchoolImg(tableProps.row.original.name))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' /> 
                    {tableProps.row.original.name}  
                </div> ),               
          },
          {
            Header: 'Wins',
            accessor: 'wins',
            Cell: tableProps => (
                <div style={{ color: "green" }}> {tableProps.row.original.wins} 
                </div> 
              ),        
          },
          {
            Header: 'Losses',
            accessor: 'losses',
            Cell: tableProps => (
                <div style={{ color: "red" }}> {tableProps.row.original.losses} 
                </div> 
              ),        
          },
          {
            Header: 'Ties',
            accessor: 'ties',        
          },
          {
            Header: 'Win %    ',
            Cell: tableProps => (
              <div className="progressBar" >
                <ProgressBar animated value={25} now={tableProps.row.original.pct.toFixed(1)} label={`${tableProps.row.original.pct.toFixed(1)}% `} />
              </div>
            ),
            accessor: 'pct',        
          },
          {
            Header: 'Points Won',
            accessor: 'winPoints',
            Cell: tableProps => (
                <div style={{ color: "green" }}> {tableProps.row.original.winPoints} 
                </div> 
              ),        
          },
          {
            Header: 'Points Lost',
            accessor: 'lossPoints',
            Cell: tableProps => (
                <div style={{ color: "red" }}> {tableProps.row.original.lossPoints} 
                </div> 
              ),               
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
         <h1 className = "text-center"><BsIcons.BsTrophy style={{ marginBottom: 10 ,marginRight: 5}}/>Team Standings</h1>
         <div style={{float:"right",paddingRight:10}}>
          <CSVLink data = {data} filename = 'Team Standings'> <button type="button" className = "btn btn-primary mb-2">  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5}}/>Download</button> </CSVLink>
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
          {loading?
                <div style={{marginBottom:0}}>                    
                    <ClipLoader
                        color={"#0d6efd"}
                        loading={loading}        
                        size = {50}
    
                        cssOverride={{marginLeft:'360%',marginRight:'auto',marginTop:'20%'}}          
                    />
                </div>
                :
                <></>    
            }
         
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
export default TeamStandingReactTable;