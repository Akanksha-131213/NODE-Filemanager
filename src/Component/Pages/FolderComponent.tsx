import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import DisplayItem from '../DisplayItem';


const FolderComponent = () => {
    const {folderId}=useParams();
    // eslint-disable-next-line 
    const {currentFolderData,childFolder,childFile}=useSelector(
      (state:any)=>({currentFolderData:state.filefolder.Folders.find(
        (folder)=>folder.docId===folderId
        )?.data,
    childFolder:state.filefolder.Folders.filter(
      (folder)=>folder.data.parent===folderId
      ),
      childFile:state.filefolder.Files.filter(
        (file)=>file.data.parent===folderId
        ),
    }),
    shallowEqual);
  return (
  <div className=''>
    <div className='container card ' style={{minHeight:"800px"}}> 
      {childFolder?.length > 0?(
      <div>
      <DisplayItem title={"Folders"} type="folder" items={childFolder}/>
      <DisplayItem title={"Files"} type="files" items={childFile}/></div>
    ):( 

      childFile?.length > 0?(<div>
      <DisplayItem title={"Files"} type="files" items={childFile}/>

   
      
    </div>):(<div className='text-center m-auto '><h4>Empty Folder</h4></div>)
       )}

    </div></div>

  )
}

export default FolderComponent