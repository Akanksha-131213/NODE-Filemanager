import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload,faFolderPlus,faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeFolder } from '../redux/action/filefolderCreator';



function SubBar({setCreateFolderOpt,setCreateFileOpt}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { currentFolder, Folders,currentFolderData } = useSelector(
    (state) => ({
      Folders: state.filefolder.Folders,
      currentFolder:state.filefolder.currentFolder,
      currentFolderData:state.filefolder.Folders.find((folder)=>folder.docId===state.filefolder.currentFolder)}),
    shallowEqual
  );

  const handleNavigate=(link,id)=>{
    navigate(link);
    dispatch(changeFolder(id));
  }



  return (
    <div >
        <nav className='navbar navbar-expand navbar-light mt-2 bg-white  border'>
        <nav aria-label="breadcrumb" className='ms-5 '>
  <ol className="breadcrumb d-flex align-item-center">
{currentFolder!== "root"?(
  <><button onClick={()=>handleNavigate("/home","root")}
  className="breadcrumb-item btn btn-link text-docoration-none">
Root
  </button>
  {currentFolderData?.data.path.map((folders,index)=>(
    <button key={index} className="breadcrumb-item btn btn-link"
    onClick={()=>handleNavigate(
      `/home/folder/${
        Folders.find((folder)=>folders===folder.docId).docId
      }`,
      Folders.find((folder)=>folders===folder.docId).docId
    )}>
      {Folders.find((folder)=>folders===folder.docId).data.name}
    </button>
  )  )}
  <li className='breadcrumb-item btn active'>
{currentFolderData?.data.name} 
  </li>
  </>
):(

  <li className="breadcrumb-item"><Link to="/home">Root</Link></li>
)}
    
    
  </ol>
</nav>
        




</nav>
<nav className='navbar navbar-expand-lg navbar-light mt-2 bg-white  border'>
<ul className='navbar-nav ms-auto'>
    {/* <li className='nav-item'>
        <button className='btn btn-outline-dark'>
        <FontAwesomeIcon icon={faFileUpload}/> Upload File
        </button>
    </li> */}
    <li className='nav-item'>
        <button className='btn btn-outline-dark' onClick={()=>setCreateFileOpt(true)}>
        <FontAwesomeIcon icon={faFileCirclePlus} /> Create File
        </button>
    </li> 
    <li className='nav-item'>
        <button className='btn btn-outline-dark' onClick={()=>setCreateFolderOpt(true)}>
        <FontAwesomeIcon icon={faFolderPlus}/> Create Folder
        </button>
    </li>
</ul></nav>
    </div>
  )
}

export default SubBar

