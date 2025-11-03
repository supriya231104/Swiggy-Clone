import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFilter, removeFilter } from '../utils/filterSlice'

function FilterBtn({name}) {
    // const [activeBtn,SetActiveBtn]=useState(null)
    const filterVal=useSelector((state)=>state.filterSlice.filterVal)
    const isActive=filterVal.includes(name)
    const dispatch=useDispatch()
     function handleActiveBtn(){
        if (isActive) {
          dispatch(removeFilter(name))
          // SetActiveBtn(null)
          
        }
        else{
          dispatch(addFilter(name))
          // SetActiveBtn(name)
    
        }
        
        
      }
  return (
    <button onClick={()=>{
        handleActiveBtn()
      }} className={"filterBtn flex gap-2 items-center betsmmd:text-[12px] " + (isActive?"active":"")}>
        {name}
        <i className={"fa-solid fa-xmark  text-black/60 text-[12px] "+(isActive?'':'hidden')}></i>
      </button>
  )
}

export default FilterBtn