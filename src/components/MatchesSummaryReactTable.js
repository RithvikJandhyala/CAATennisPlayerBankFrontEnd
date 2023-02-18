import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import MatchService from '../services/MatchService';
import {CSVLink} from 'react-csv';
import win from "./images/check.png";
import * as B from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import { GlobalFilter } from './GlobalFilter';
import SchoolService from '../services/SchoolService';
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const divisions = [
  { value: 'All Divisions', label: 'All Divisions' },
  { value: "JH Boys", label: 'JH Boys' },
  { value: 'JH Girls', label: 'JH Girls' },
  { value: "HS Boys", label: 'HS Boys' },
  { value: 'HS Girls', label: 'HS Girls' }
]

const MatchesSummaryReactTable=()=>{ 
  const [data,setMatchesDaySummary]=useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      //await sleep(2000);
      await MatchService.getMatchesDaySummary().then((response) => {           
        setMatchesDaySummary(response.data);
      });
      setLoading(false);  
    }
    fetchData();   
  },[]);

  async function fetchDataByDivision(division) {     
    setLoading(true);
    //await sleep(2000);
    await MatchService.getMatchesDaySummaryByDivision(division).then((response) => {           
      setMatchesDaySummary(response.data);
    });
    setLoading(false);  
  }

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
          <CSVLink data = {data} filename = 'AllTeamMatches'> <button type="button" className = "btn btn-primary mb-2">  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5}}/>Download</button> </CSVLink>
        </div>         
        <div className='rowC' >
              <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />  
              <div style={{  width: 200, marginLeft: 10,borderRadius: 10,  borderColor: 'grey'}}>      
              <Select style={{ width: 500,  borderRadius: 50}}
                  value={divisions.value}                                           
                  isSearchable={false}
                  onChange = {(e) =>{ fetchDataByDivision(e.label);  }} 
                  options={divisions}
                  defaultValue={divisions[0]}                  
              />         
              </div>                            
        </div> 
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
                        cssOverride={{marginLeft:'320%',marginRight:'auto',marginTop:'20%'}}          
                    />
                </div>
                :
                <></>    
            }
          <tbody {...getTableBodyProps()}>
            {
            (!loading)?
              rows.map(row => {
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
              }):
              <></>
            
            }
          </tbody>
        </table>
        </>
        </div>

    </div>
  )
}
export default MatchesSummaryReactTable;