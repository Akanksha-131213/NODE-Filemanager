import * as types from "../actionType/filefolderActionType";
import fire from "../../config/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import { files, folders } from "../Graphql/query";

//actions
// const URL = "http://localhost:8080";
// const URL = "https://node-backend-filemanager.vercel.app";

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});
export const addFolders = (payload) => ({
  type: types.ADD_FOLDER,
  payload,
});

export const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});
const addFile = (payload) => ({
  type: types.ADD_FILES,
  payload,
});
//s
const addFiles = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

export const createFolder = (data) => (dispatch) => {
  // axios
  //   .post(`${URL}/folder/add`, data)
  //   .then(async (folder) => {
  //     const folderData = data;
  //     const folderId = folder.data._id;
  //     dispatch(addFolder({ data: folderData, docId: folderId }));
  //     toast.success("folder created successfully");
  //   })
  //   .catch((error) => console.error(error));
};
export const createFile = (data) => (dispatch) => {
  //   console.log(data);
  //   axios
  //     .post(`${URL}/file/add`, data)
  //     .then(async (file) => {
  //       console.log("done", file.data._id);
  //       const fileData = data;
  //       const fileId = file.data._id;
  //       toast.success("created sucessfully");
  //       dispatch(addFile({ data: fileData, docId: fileId }));
  //     })
  //     .catch((error) => console.error(error));
};

export const getFolders = (data) => (dispatch) => {
  dispatch(setLoading(false));
  const foldersData = data.folders.map((folder) => ({
    data: folder,
    docId: folder._id,
  }));

  dispatch(addFolders(foldersData));
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};
export const getFiles = (data) => (dispatch) => {
  const filesData = data.files.map((file) => ({
    data: file,
    docId: file._id,
  }));
  console.log(filesData);
  dispatch(addFiles(filesData));
};

export const delFile = (id) => (dispatch) => {
  // console.log(id);
  // axios
  //   .delete(`${URL}/file/${id}`)
  //   .then(dispatch(getFiles()), toast.success("File deleted"));
};
export const delFolder = (id) => async (dispatch) => {
  // console.log(id);
  // await axios.delete(`${URL}/folder/${id}`);
  // toast.success("Folder deleted");
  // dispatch(getFolders());
};
export const updateFileData = (fileId, data) => (dispatch) => {
  console.log(data);
  const sdata = { data: data };
  axios
    .put(`${URL}/file/${fileId}`, sdata)
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File saved successfully!");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    });
};

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
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
      const fullData = { ...data, url: fileUrl };

      axios
        .post(`${URL}/file/add`, fullData)
        .then(async (file) => {
          const fileData = fullData;
          const fileId = file.data._id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          toast.success("File uploaded successfully!");
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};
