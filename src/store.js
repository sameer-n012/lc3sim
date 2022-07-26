import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { registerReducer } from './reducers/registerReducers';
import { memoryReducer } from './reducers/memoryReducers';
import { inputReducer, outputReducer } from './reducers/inputOutputReducers';
import {
	runningReducer,
	debugSpeedReducer,
} from './reducers/machineStateReducers';

const middleware = [thunk];
const reducers = combineReducers({
	registers: registerReducer,
	memory: memoryReducer,
	output: outputReducer,
	input: inputReducer,
	running: runningReducer,
	debugSpeed: debugSpeedReducer,
});

const initialState = {};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
