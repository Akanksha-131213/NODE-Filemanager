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
// import { createStore, applyMiddleware ,combineReducers} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import filefolderReducer from "./reducer/filefolderReducer";
// import {sagas} from "./action/sagas"
// const rootReducer=combineReducers({filefolder:filefolderReducer});
// const sagaMiddleware = createSagaMiddleware();
// export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(sagas);
// export default store