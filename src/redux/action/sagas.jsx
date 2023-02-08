import {  put ,call, takeEvery} from "redux-saga/effects";
import {setLoading,addFolders} from "./filefolderCreator";
import fire from "../../config/firebase";
import { GET_FOLDER } from "../actionType/filefolderActionType";


function getapi(){
    return( fire
    .firestore()
    .collection("Folder")
    .get()
    .then(async(folders)=>{
        const foldersData=await folders.docs.map((folder) => ({
            data: folder.data(),
            docId: folder.id,
        }));
       
    }).catch(error => ({ error })))

}

export function* getFolders(){

        yield put (setLoading(true));

    const{foldersData,error}= yield call (getapi)
    if (!error){
        yield put(setLoading(false));
        yield put (addFolders(foldersData));
       }
   
}


export function* sagas(){
    yield takeEvery(GET_FOLDER,getFolders())

}