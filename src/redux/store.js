import {createStore,combineReducers,applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./reducer/authreducer.js"
import filefolderReducer from "./reducer/filefolderReducer.js";

const rootReducer=combineReducers({auth :authReducer , filefolder:filefolderReducer});
 const store =createStore(
    rootReducer ,
    composeWithDevTools(applyMiddleware(thunk))

);
export default store