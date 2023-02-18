import { useTable, useGlobalFilter } from 'react-table'
import React,{useState, useEffect} from 'react';
import MatchService from '../services/MatchService';
import {CSVLink} from 'react-csv';
import pic from "./images/player1.png";
import win from "./images/check.png";
import Doubles from "./images/doubles.png";
import * as GiIcons from 'react-icons/gi';
import { GlobalFilter } from './GlobalFilter';
import * as SiIcons from 'react-icons/si';
import SchoolService from '../services/SchoolService';
import {useNavigate} from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Select from 'react-select';
const divisions = [
  { value: 'All Divisions', label: 'All Divisions' },
  { value: "JH Boys", label: 'JH Boys' },
  { value: 'JH Girls', label: 'JH Girls' },
  { value: "HS Boys", label: 'HS Boys' },
  { value: 'HS Girls', label: 'HS Girls' }
]

const PlayerMatchesReactTable=()=>{ 
  const [data,setMatches]=useState([]);
  const navigate=useNavigate();
  const [loading,setLoading] = useState(false);
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(()=>{
    async function fetchData() {
      setLoading(true);
      //await sleep(4000);
      await MatchService.getMatches().then((response) => {           
          setMatches(response.data);
      });
      setLoading(false);  
     
    }
    fetchData();      
  },[]);
  async function fetchDataByDivision(division) {     
    setLoading(true);
    //await sleep(2000);
    await MatchService.getMatchesByDivision(division).then((response) => {           
      setMatches(response.data);
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
            Header: '#',
            accessor: 'id',        
          },
          {
            Header: 'Division',
            accessor: 'division',        
          },
          {
            Header: 'Type',
            accessor: 'matchType',        
          },
          {
            Header: 'Home Team',
            accessor: 'homeTeam',   
            Cell: tableProps => (
                <div>             
                    <img  src= {require('./images/'+SchoolService.getSchoolImg(tableProps.row.original.homeTeam))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' /> 
                    {tableProps.row.original.homeTeam}  
                </div> ),     
          },
          {
            Header: 'Home Player',
            accessor: 'player1Name' ,
           // accessor: d => (<div>{d.player1ID} - {d.player1Name}</div>),
            Cell: tableProps => (
                <div>
                    <div>  
                        {(tableProps.row.original.matchType === 'Singles')?
                            <img  src= {pic} style={{ width: 30, height:30 }} className = 'player1' />:
                            <img  src= {Doubles} style={{ width: 35, height:35 }} className = 'player1' />
                        }
                        {tableProps.row.original.player1ID} - {tableProps.row.original.player1Name}
                        {(tableProps.row.original.player2Score < tableProps.row.original.player1Score)?
                            <img  src= {win} style={{ width: 15, height:15,marginLeft:5 }} className = 'player1' />:
                            <></>
                        }
                    </div>
                   

                </div>
                 
              ),
          },
          {
            Header: 'Score',
            accessor: 'player1Score',
          },
          {
            Header: 'Away Team',
            accessor: 'awayTeam',    
            Cell: tableProps => (
                <div>             
                    <img  src= {require('./images/'+SchoolService.getSchoolImg(tableProps.row.original.awayTeam))} style={{ width: 30, height:30,marginRight: 10 }} className = 'player1' /> 
                    {tableProps.row.original.awayTeam}  
                </div> 
                
                ),      
          },
      {
        Header: 'Away Player',
        accessor: 'player2Name',
        //accessor:  d => (<div>{d.player2ID} - {d.player2Name}</div>),
        Cell: tableProps => (
            <div>
                <div>  
                {(tableProps.row.original.matchType === 'Singles')?
                    <img  src= {pic} style={{ width: 30, height:30 }} className = 'player1' />:
                    <img  src= {Doubles} style={{ width: 35, height:35 }} className = 'player1' />
                }
               
                {tableProps.row.original.player2ID} - {tableProps.row.original.player2Name}
                {(tableProps.row.original.player2Score > tableProps.row.original.player1Score)?
                <img  src= {win} style={{ width: 15, height:15,marginLeft:5 }} className = 'player1' />:
                <></>
              }
             
                </div>               
            </div>
          ),
      },
      {
        Header: 'Score',
        accessor: 'player2Score',
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
         <h1 className = "text-center"><GiIcons.GiTennisCourt style={{ marginBottom: 10 ,marginRight: 5}}/>Past Matches</h1>
         <div style={{float:"right",paddingRight:10}}>
            
            <CSVLink data = {data} filename = 'AllPlayerMatches'> <button type="button" className = "btn btn-primary mb-2">  <SiIcons.SiMicrosoftexcel  style={{ width: 20,height:20,marginRight: 5}}/>Download</button> </CSVLink>
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
    
                        cssOverride={{marginLeft:'370%',marginRight:'auto',marginTop:'20%'}}          
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
              })
              :
              <></>
          }
          </tbody>
        </table>
        </>
        </div>
      {//</TableScrollbar>
}
    </div>
  )
}
export default PlayerMatchesReactTable;