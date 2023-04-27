import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { getFiles, getFolders } from "../redux/action/filefolderCreator.js";
import { folders, files } from "../redux/Graphql/query.js";
import { Dashboard } from "./Dashboard";
import { useQuery } from "@apollo/client";

import CreateFile from "./Pages/CreateFile";
import CreateFolder from "./Pages/CreateFolder";
import FileComponent from "./Pages/FileComponent";
import FolderComponent from "./Pages/FolderComponent";
import UploadFile from "./Pages/UploadFile";
import { Navigation } from "./SideBar/Navigation";
import SubBar from "./SubBar";

interface State {
  filefolder: any;
  text: "";
  isLoading: Boolean;
  currentFolder: "root";
  Folders: [];
  Files: [];
}

function Home() {
  const dispatch = useDispatch();
  const [showSubBar, setSubBar] = useState(true);
  const { pathname } = useLocation();
  const [isCreateFolderOpt, setCreateFolderOpt] = useState(false);
  const [isCreateFileOpt, setCreateFileOpt] = useState(false);
  const [isUploadFileOpt, setUploadFileOpt] = useState(false);
  const { loading, error, data } = useQuery(folders);
  const res2 = useQuery(files);
  // const isLoading: boolean = loading;
  console.log("data file ka", res2.data);
  console.log(data);
  useEffect(() => {
    if (pathname.includes("/file/")) {
      setSubBar(false);
    } else {
      setSubBar(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!loading && !res2.loading) {
      dispatch(getFiles(res2.data));
      dispatch(getFolders(data));
    }
  }, [loading, res2.loading, dispatch]);
  if (loading) return <>"Wait ..."</>;
  if (error) return <>"error"</>;
  return (
    <div className="container align-items-center m-auto ">
      <div
        className="flex justify-content-center m-auto border "
        style={{ height: "700px", overflowX: "hidden", overflowY: "auto" }}
      >
        <div>
          <nav className="navbar navbar-expand-sm bg-dark justify-content-center text-white fw-bold">
            FILE MANAGEMENT APP
          </nav>{" "}
        </div>

        {isCreateFolderOpt && (
          <CreateFolder
            setShowModal={setCreateFolderOpt}
            showModal={isCreateFolderOpt}
          />
        )}

        {isCreateFileOpt && (
          <CreateFile
            setShowModal2={setCreateFileOpt}
            showModal2={isCreateFileOpt}
          />
        )}

        {isUploadFileOpt && (
          <UploadFile setIsFileUploadModalOpen={setUploadFileOpt} />
        )}

        {showSubBar && (
          <SubBar
            setCreateFolderOpt={setCreateFolderOpt}
            setCreateFileOpt={setCreateFileOpt}
            setUploadFileOpt={setUploadFileOpt}
          />
        )}

        <div className="row">
          <Navigation />
          <span className="col-9 border">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="folder/:folderId" element={<FolderComponent />} />
            </Routes>
          </span>{" "}
          <Routes>
            <Route path="file/:fileId" element={<FileComponent />} />
          </Routes>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
