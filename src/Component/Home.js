import React, { useState,useEffect} from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getFolders } from '../redux/action/filefolderCreator';
import { Dashboard } from './Dashboard'
import CreateFolder from './Pages/CreateFolder';
import FolderComponent from './Pages/FolderComponent';
import SubBar from './SubBar'




function Home() {
const dispatch=useDispatch();
  const [isCreateFolderOpt,setCreateFolderOpt]=useState(false);
  const {isLoading}=useSelector((state)=>({
    isLoading:state.filefolder.isLoading
  }),shallowEqual)
  useEffect(() => {
if(isLoading){
dispatch(getFolders());
}
    
  }, [isLoading,dispatch])
  
  
  
  return (
    <div>
      {
        isCreateFolderOpt&&
        (<CreateFolder setShowModal={setCreateFolderOpt} showModal={isCreateFolderOpt}/>)
      }
<SubBar setCreateFolderOpt={setCreateFolderOpt}/>
{/* <Dashboard/> */}
<Routes>
  <Route path="" element={<Dashboard/>}/>
  <Route path="folder/:folderId" element={<FolderComponent/>}/>
</Routes>
    </div>
  )
}

export default Home