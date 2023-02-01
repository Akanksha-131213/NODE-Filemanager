import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import DisplayItem from './DisplayItem'


export const Dashboard = () => {
   // const folders =["new folder","new folder 2"];
//const files =[ {name:"new f1"}, {name:"new f2"}];
const {isLoading,Folders,Files}=useSelector((state)=>({
  isLoading:state.filefolder.isLoading,
  Folders:state.filefolder.Folders.filter((folder)=>folder.data.parent==="root"),
  Files:state.filefolder.Files.filter((file)=>file.data.parent==="root"),
}),shallowEqual)
  return (
    <div className='container card ' >
        
        {isLoading?(<h1> Wait....</h1>):
        (<div>
          <DisplayItem title={"Folders"} type="folder" items={Folders}/>
        <DisplayItem title={"files"} type="files" items={Files}/>
      </div>  )} 
        

</div>
    
  )
}
