import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import DrumLoader from './DrumLoader'
import Sequencer from './Sequencer'
import AppLayout from './layouts/AppLayout'
import store from './store'
import {audioCtx, clock} from './audioCtx'
import Raven from 'raven-js'

Raven.config('https://af8ab5c617aa41658dcdfbfe094791ea@sentry.io/264750').install()
Raven.context(function(){
	ReactDOM.render(
		<Provider store={store}>
			<div style={{width: '100%', height: '100vh'}}>
				<DrumLoader audioCtx={audioCtx}/>
				<Sequencer audioCtx={audioCtx} clock={clock}/> 
				<AppLayout />
			</div>
		</Provider>,
		document.getElementById('root')
	);	
})

