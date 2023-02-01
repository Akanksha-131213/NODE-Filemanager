import React, { useState } from 'react'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createFile } from '../../redux/action/filefolderCreator';

const CreateFile = ({showModal2,setShowModal2}) => {

  const { currentFolder,Files,currentFolderData } = useSelector(
    (state) => ({
      Files: state.filefolder.Files,
      currentFolder:state.filefolder.currentFolder,
      currentFolderData:state.filefolder.Folders.find((folder)=>folder.docId===state.filefolder.currentFolder)}),
    shallowEqual
  );

    
      const dispatch=useDispatch();
      const checkFileAlreadyPresent=(name,ext)=>{
        if(!ext){
          name=name+".txt"
        }
      
      const FilePresent=Files
      .filter(
        (file)=>file.data.parent===currentFolder)
      .find((file)=>
      file.data.name===name);
      if (FilePresent)
      return true;
      else return false;
    
  }
    


    
    const [fileName, setFileName] = useState("");
     const handleFileSubmit=(e)=>{
        e.preventDefault();
        if(fileName){
          let extension=false;
          if(fileName.split(".").length > 1){
            extension=true;
          }
        
            if (checkFileAlreadyPresent(fileName,extension)){
                alert("File already present.")
            }
            else{
                alert("file created.")
                const data={
              
                  name:extension?fileName:`${fileName}.txt`,
                  createdAt:new Date(),
                  path:
                  currentFolder ==="root"
                  ?[]:[...currentFolderData?.data.path,currentFolder],
                  parent:currentFolder,
                  lastAccess:null,
                  updatedAt:new Date(),
                  extension:extension?fileName.split(".")[1]:`txt`,
                  data:"",
                  url:"",
                }
                console.log(data);
                dispatch(createFile(data));

            }


        }else{
            alert('file  name cannot be empty.')
        }

    }
  return (
    <div><>
    <Modal show={showModal2} onHide={() => setShowModal2(false)}>
      <Modal.Header>
        <Modal.Title>Create File</Modal.Title>
        <Button
          variant="white"
          style={{ cursor: "pointer" }}
          onClick={() => setShowModal2(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFileSubmit}>
          <Form.Group controlId="formBasicFileName" className="my-2">
            <Form.Control
              type="text"
              placeholder="Enter file name..."
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicFileSubmit" className="mt-5">
            <Button type="submit" className="form-control" variant="primary">
              Add File
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
    {/* <Button
    //   onClick={() => setShowModal2(true)}
      variant="outline-dark"
      className="border-1 d-flex align-items-center justify-content-between rounded-2"
    >
      <FontAwesomeIcon icon={faFilePlus} />
      &nbsp; Create File
    </Button> */}
  </></div>
  )
}

export default CreateFile
//   <div className='col-md-12 positionfixed top-0 left-0 w-100 h-100'>
// style={{background :"rgba(0,0,0,0.4"}}
// <div