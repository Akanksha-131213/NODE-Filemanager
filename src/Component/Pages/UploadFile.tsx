import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { uploadFile } from "../../redux/action/filefolderCreator.js";
import { toast } from "react-toastify";
import fire from "../../config/firebase.js";
import { create_File } from "../../redux/Graphql/query";
import { useMutation } from "@apollo/client";
import { createFiles } from "../../redux/action/filefolderCreator";
interface State {
  filefolder: any;
  text: "";
  isLoading: true;
  currentFolder: "root";
  Folders: [];
  Files: [];
}

const UploadFile = ({ setIsFileUploadModalOpen }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [createFile, { error }] = useMutation(create_File);
  const { Files, currentFolder, currentFolderData } = useSelector(
    (state: State) => ({
      Files: state.filefolder.Files,
      currentFolder: state.filefolder.currentFolder,
      currentFolderData: state.filefolder.Folders.find(
        (folder: { docId: any }) =>
          folder.docId === state.filefolder.currentFolder
      ),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFile("");
      setSuccess(false);
      setIsFileUploadModalOpen(false);
    }
  }, [success]);

  const checkFileAlreadyPresent = (name: String) => {
    const filePresent = Files.filter(
      (file: { data: { parent: String } }) => file.data.parent === currentFolder
    ).find((fldr: { data: { name: String } }) => fldr.data.name === name);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (file) {
      if (!checkFileAlreadyPresent(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          path:
            currentFolder === "root"
              ? []
              : [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccess: null,
          updatedAt: new Date(),
          extension: file.name.split(".")[1],
          data: null,
          url: "",
        };
        setIsFileUploadModalOpen(false);
        toast.info("uploading...");
        const uploadFileRef = fire.storage().ref(`files/${data.name}`);

        uploadFileRef.put(file).on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            console.log("uploading " + prog + "%");
          },
          (error) => {
            toast.error(error);
          },
          async () => {
            const fileUrl = await uploadFileRef.getDownloadURL();

            const id = await createFile({
              variables: { ...data, url: fileUrl },
            });
            const docId = id.data.createFile._id;
            const fullData = { ...data, url: fileUrl, docId: docId };
            console.log(fullData);
            dispatch(createFiles(fullData));
          }
        );

        // dispatch(uploadFile(file, data, success, setSuccess));
      } else {
        toast.info("File already present");
      }
    } else {
      toast.error("File name cannot be empty");
    }
  };

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-cnter justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Upload File</h4>
            <button
              className="btn"
              onClick={() => setIsFileUploadModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Upload File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
