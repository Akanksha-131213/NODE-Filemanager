import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import DisplayItem from '../DisplayItem';


const FolderComponent = () => {
    const {folderId}=useParams();
    // eslint-disable-next-line 
    const {currentFolderData,childFolder}=useSelector(
      state=>({currentFolderData:state.filefolder.Folders.find(
        (folder)=>folder.docId===folderId
        )?.data,
    childFolder:state.filefolder.Folders.filter(
      (folder)=>folder.data.parent===folderId
      ),
    }),
    shallowEqual);
  return (
    <div> 
      {childFolder?.length > 0?(
      <div>
      <DisplayItem title={"Folders"} type="folder" items={childFolder}/></div>
    ):(
    <p>
      Empty Folder
    </p>)}

    </div>

  )
}

export default FolderComponent