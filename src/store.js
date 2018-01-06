import { compose, createStore, applyMiddleware } from 'redux'
import samplePlayer from './middleware/samplePlayer'
import initialState from './initialState'
import reducer from './reducers'
import {ON_TICK} from './actionTypes'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      actionsBlacklist: [ON_TICK]
    }) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(samplePlayer)
)

export default createStore(reducer, 
	initialState, 
	enhancer)