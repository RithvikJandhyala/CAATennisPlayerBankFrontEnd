import React from 'react'

export const GlobalFilter = ({filter,setFilter}) => {
  return (
        <div> 
            
            <input 
                value = {filter || ''}
                onChange = {e => setFilter(e.target.value)}
                placeholder = 'search here'
                className = "inputsearch"/>


            
        </div>

  )
}
