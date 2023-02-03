import React, { useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import FileHeader from './FileHeader';
import CodeEditor from "./CodeEditor.jsx";

const FileComponent = () => {
    const{fileId}=useParams();
    const [fileData, setFileData] = useState("");
    const [prevFileData, setPrevFileData] = useState("");

const{currentFile}=useSelector((state:any)=>({ 
     currentFile:state.filefolder.Files.find(
        (file)=>file.docId===fileId
     ),
}),shallowEqual)


useEffect(() => {
    if (currentFile) {
      setFileData(currentFile?.data?.data);
      setPrevFileData(currentFile?.data?.data);
    }
  }, [currentFile, currentFile?.data?.data]);
return (
    <div className='card '>
        <FileHeader fileName={currentFile?.data?.name}
              fileData={fileData}
              prevFileData={prevFileData}
              fileId={fileId}
            />
            <CodeEditor
              fileName={currentFile?.data?.name}
              data={fileData}
              setData={setFileData}
            /></div>
  )
}

export default FileComponent