import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import NavHead from './NavHead';
const Tree = () => {
  const {Folders,Files}=useSelector((state)=>({
    
    Folders:state.filefolder.Folders,
    Files:state.filefolder.Files

  
  }),shallowEqual);


 const navo=[{id:"root" ,name:"root",parentId:"0",children: null}];
 let element={};
    for (const item in Folders){
  
      element={id:Folders[item].docId,name:Folders[item].data.name, parentId:Folders[item].data.parent,children: null};
       navo.push(element)
    }
    for (const item in Files){
      element={id:Files[item].docId,name:Files[item].data.name, parentId:Files[item].data.parent,children: null};
       navo.push(element)
    }

  const data=navo;

    
  function toTree(arr) {
    let arrMap = new Map(arr.map(item => [item.id, item]));
    let tree = [];
  
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
  
      if (item.parentId !== "0") {
        let parentItem = arrMap.get(item.parentId);
  
        if (parentItem) {
          let { children } = parentItem;
  
          if (children) {
            parentItem.children.push(item);
          } else {
            parentItem.children = [item];
          }
        }
      } else {
        tree.push(item);
      }
    }
  
    return tree;
  }
  
  let tree = toTree(navo);
  
  // window.alert(JSON.stringify(result));

  return (
    <><NavHead data={tree}/>
    

       {/* {tree.map((item,index)=>{
return <p key={index *55 } >
  {item.id} 
</p>
       })} */}
    </>
  )
}

export default Tree