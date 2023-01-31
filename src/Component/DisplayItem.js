import React from 'react'
import{faFolder,faFileAlt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import {changeFolder} from '../redux/action/filefolderCreator'
function DisplayItem( {title,items,type}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleDblClick=(itemId)=>{
    if ( type==="folder"){
      dispatch(changeFolder(itemId));
      navigate(`/home/folder/${itemId}`);
    }
    else{
      alert("sdgajkfs");
    }
  }
  return (
    <div>
        <h4 className='text-center border-bottom'>{title}</h4>
<div className='row gap-2 py-4 px-5'>
    {items.map((item,index)=>{
return <p key={index *55 } className='col-md-2 border p-2 text-center d-flex flex-column' 
onDoubleClick={()=>handleDblClick(item.docId)}
>
 {type==="folder"?(
  <FontAwesomeIcon icon={faFolder} size="4x" className='mb-3'/>

 ):(
  <FontAwesomeIcon icon={faFileAlt}  size="4x" className='mb-3'/>
 )}
 
  {item.data.name}</p>

    })}
</div>




    </div>
  )
}

export default DisplayItem