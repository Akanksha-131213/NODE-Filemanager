import * as types from "../actionType/filefolderActionType";

const initialState={
    isLoading:true,
    currentFolder:"root",
    Folders:[],
    Files:[]

}

const filefolderReducer=(state=initialState,action)=> {
    switch (action.type) {
        case types.CREATE_FOLDER:
            return{
                ...state,
                Folders:[...state.Folders,action.payload],
            };
        case types.ADD_FOLDER:
            return{
                ...state,
                Folders:action.payload,
            };
            case types.SET_LOADING:
                return{
                    ...state,
                    isLoading:action.payload,
                }
                case types.CHANGE_FOLDER:
                    return{
                        ...state,
                        currentFolder:action.payload,
                    }
    

        default:
          return state;
      }

}



export default filefolderReducer
