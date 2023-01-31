import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import DisplayItem from './DisplayItem'


export const Dashboard = () => {
   // const folders =["new folder","new folder 2"];
//const files =[ {name:"new f1"}, {name:"new f2"}];
const {isLoading,Folders}=useSelector((state)=>({
  isLoading:state.filefolder.isLoading,
  Folders:state.filefolder.Folders.filter((folder)=>folder.data.parent==="root"),
}),shallowEqual)
  return (
    <div>
        
        {isLoading?(<h1> Wait....</h1>):
        (<div><DisplayItem title={"Folders"} type="folder" items={Folders}/>
        {/* <DisplayItem title={"files"} type="files" items={files}/> */}
      </div>  )} 
        

</div>
    
  )
}
