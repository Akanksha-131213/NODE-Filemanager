import * as types from "../actionType/filefolderActionType";
import fire from "../../config/firebase"
//actions

const addFolder=(payload)=>({
    type: types.CREATE_FOLDER,
    payload
})
const addFolders=(payload)=>({
    type: types.ADD_FOLDER,
    payload
})

const setLoading=(payload)=>({
type:types.SET_LOADING,
payload,
})

const setChangeFolder=(payload)=>({
    type:types.CHANGE_FOLDER,
    payload
})


//action creater

export const createFolder = (data)=>(dispatch)=>{
    // console.log(data);
    fire.firestore().collection("Folder").add(data).then(async(folder)=>{
        const folderData=await (await folder.get()).data();
        const folderId=folder.id;

        dispatch(addFolder({data:folderData,docId:folderId}))
        alert("folder created successfully")
    }

    )
}

export const getFolders=()=>(dispatch)=>{
    dispatch(setLoading(true));
    fire
    .firestore()
    .collection("Folder")
    .get()
    .then(async(folders)=>{
        const foldersData=await folders.docs.map((folder)=>({
      data:folder.data(),
        docId: folder.id,}));
         dispatch(setLoading(false));
        dispatch(addFolders(foldersData));
       
    });
}
export const changeFolder=(folderId)=>(dispatch)=>{
    dispatch(setChangeFolder(folderId));
}