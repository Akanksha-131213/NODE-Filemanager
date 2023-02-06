import {createStore,combineReducers,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import filefolderReducer from "./reducer/filefolderReducer.js";

const rootReducer=combineReducers({filefolder:filefolderReducer});
 const store =createStore(
    rootReducer ,
    composeWithDevTools(applyMiddleware(thunk))

);
export default store