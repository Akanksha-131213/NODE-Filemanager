import * as types from "../actionType/filefolderActionType";
import fire from "../../config/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { files, folders, create_Folder } from "../Graphql/query";

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

const deleteFile = (payload) => ({
  type: types.DELETE_FILE,
  payload,
});
export const createFolders = (data) => (dispatch) => {
  dispatch(addFolder({ data: data, docId: data.docId }));
  toast.success("folder created successfully");
};
export const createFiles = (data) => (dispatch) => {
  dispatch(addFile({ data: data, docId: data.docId }));
  toast.success("created sucessfully");
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

  console.log("test file ka", filesData);
  dispatch(addFiles(filesData));
};

export const delFiles = (id, data) => (dispatch) => {
  const ans = Object.entries(data) // converts each entry to [key, value]
    .filter(([k, v]) => v.docId !== id) // define the criteria to include/exclude items
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc; // this function can be improved, it converts the [[k, v]] back to {k: v, k: v, ...}
    }, {});
  // console.log(data, "ers");

  var val = Object.keys(ans).map((key) => {
    return ans[key];
  });

  toast.success("File deleted successfully!");
  dispatch(addFiles(val));
  // console.log(val, "ers");
};
export const delFolders = (id, data) => async (dispatch) => {
  const ans = Object.entries(data) // converts each entry to [key, value]
    .filter(([k, v]) => v.docId !== id) // define the criteria to include/exclude items
    .reduce((acc, [k, v]) => {
      acc[k] = v;
      return acc; // this function can be improved, it converts the [[k, v]] back to {k: v, k: v, ...}
    }, {});
  // console.log(data, "ers");

  var val = Object.keys(ans).map((key) => {
    return ans[key];
  });
  toast.success("Folder deleted successfully!");
  dispatch(addFolders(val));
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
