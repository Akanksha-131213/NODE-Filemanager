import React, { useState} from 'react'
import { useNavigate } from 'react-router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {changeFolder, delFile, delFolder} from '../redux/action/filefolderCreator.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash ,faInfoCircle} from '@fortawesome/free-solid-svg-icons';

function DisplayItem( {title,items,type}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();

const {Folders,Files}=useSelector((state)=>({
  Folders:state.filefolder.Folders.filter((folder)=>folder.data.parent==="root"),
  Files:state.filefolder.Files.filter((file)=>file.data.parent==="root"),
}),shallowEqual);


const handleDel=(type,id)=>{
 if (type==="folder"){
dispatch (delFolder(id))
for (const i in Folders){
  if(Folders[i].data.path.includes(id)){
    console.log(Folders[i].data.name)
    dispatch(delFolder(Folders[i].docId))}

}
for (const i in Files){
  if(Files[i].data.parent===id){
    
    dispatch(delFolder(Files[i].docId))}

}
 }
 else{
dispatch(delFile(id));
 }

}

const handleInfo=()=>{
}

  

  const handleDblClick=(itemId)=>{
    
    if ( type==="folder"){ 
    navigate(`/home/folder/${itemId}`);
    dispatch(changeFolder(itemId));
     }
    else{
      navigate(`/home/file/${itemId}`)
    }
  }
 
  return (
    
    <div className='flex justify-content-center m-auto'>

     
       
<div className='row gap-2 py-4 px-5 text-center fw-bold '>
    {items.map((item,index)=>{ 

return <div className='col-2 card shadow' style={{width:"150px",minHeight:"170px"}}>
<div key={index *55 } className=' text-center mt-3  flex-column justify-content-center' 
onDoubleClick={()=>handleDblClick(item.docId)}
>
 {type==="folder"?(
  <div className='text-centers m-auto'>
  <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-folder-web-flaticons-lineal-color-flat-icons-5.png" 
  alt="" width="80" height="*80"/>
</div>
 ):(

  <div className='text-centers m-auto'>
  <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-file-web-flaticons-lineal-color-flat-icons-7.png" 
  alt='' width='90' height='90'/>
  </div>
 )}
 
 
  {item.data.name }</div>
  <span>
    <button className='btn align-self-start' data-bs-toggle="modal" data-bs-target="#exampleModal"><FontAwesomeIcon 
  icon={faInfoCircle} onClick={()=>handleInfo(item)}/></button>
  <button className='btn align-self-end'><FontAwesomeIcon 
  icon={faTrash} onClick={()=>handleDel(type,item.docId)}/></button>
  
  
  </span>
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Properties</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body ">
        <ul className='list-group list-group-flush'>
        <li className='list-group-item'>Name: <span className='text-secondary'> {item.data.name}</span></li>
        <li className='list-group-item'>U-Id: <span className='text-secondary'>{item.docId}</span></li>
        <li className='list-group-item'>Parent: <span className='text-secondary'>{item.data.parent}</span></li>
        <li className='list-group-item'>Path: <span className='text-secondary'>root{item.data.path.map((i)=>(i)?(<p>{i}</p>):(""))}</span></li>
     
       </ul>
      </div>
      
    </div>
  </div>
</div>

  </div>

    })}
</div>





    </div>
  )
}

export default DisplayItem