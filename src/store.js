import { compose, createStore, applyMiddleware } from 'redux'
import samplePlayer from './middleware/samplePlayer'
import initialState from './initialState'
import reducer from './reducers'

export default createStore(reducer, 
	initialState, 
	applyMiddleware(samplePlayer))