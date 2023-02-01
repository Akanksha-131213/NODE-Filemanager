import React from 'react'
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
    <div className='flex justify-content-center m-auto'>
<div className='row gap-2 py-4 px-5 text-center fw-bold '>
    {items.map((item,index)=>{
return <p key={index *55 } className=' card col-2 border text-center  flex-column justify-content-center' 
onDoubleClick={()=>handleDblClick(item.docId)}
>
 {type==="folder"?(
  <div className='text-centers m-auto'>
  <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-folder-web-flaticons-lineal-color-flat-icons-5.png" alt="" width="80" height="*80"/>
</div>
 ):(

  <div className='text-centers m-auto'>
  <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-file-web-flaticons-lineal-color-flat-icons-7.png" alt='' width='90' height='90'/>
  </div>
 )}
 
 
  {item.data.name }</p>

    })}
</div>





    </div>
  )
}

export default DisplayItem