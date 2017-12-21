import {
	TOTAL_STEPS
} from '../constants'
import {
	STEP_CLICK,
	ON_TICK,
	ON_LOAD,
	DRUM_PANEL_CLICK,
	CONTROL_PANEL_CLICK
} from '../actionTypes'
import drumConfig from '../drumConfig'
import {stepKey} from '../helpers'
import initialState from '../initialState'

export default (state, {type, payload}) => {
	switch (type) {
		case DRUM_PANEL_CLICK:
			return state.set('showDrumPanel', !state.getIn(['showDrumPanel']))
		case CONTROL_PANEL_CLICK:
			return state.seT('showControlPanel', !state.get(['showControlPanel']))
		case STEP_CLICK: {
			const {type: drumType, step} = payload;
			let selector = ['stepState', stepKey(drumType, step)];
			return state.setIn(selector, !state.getIn(selector));
		}
		case ON_TICK: {
			let nextStep = state.getIn(['currentStep']) + 1;
			// reset nextStep to 0 once it hits that last sequencer step
			if( nextStep === TOTAL_STEPS) {
				nextStep = 0;
			}
			return state.set('currentStep', nextStep);
		}
		case ON_LOAD: {
			const {type: drumType, mode, buffer} = payload;
			let newState = state.setIn(['drumBufferState', drumType, mode], buffer);
			const totalSamplesLoaded = newState.getIn(['totalSamplesLoaded']) + 1;
			newState = newState.set('totalSamplesLoaded', totalSamplesLoaded);
			// There's two samples per each 'drum'
			if (totalSamplesLoaded == drumConfig.length * 2) {
				return newState.set('samplesLoaded', true);
			}
			return newState;
		}
		default:
			return state ;
	}
}