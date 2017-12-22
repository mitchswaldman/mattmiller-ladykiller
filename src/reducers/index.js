import {
	TOTAL_STEPS,
	MATT_MODE,
	TIANA_MODE
} from '../constants'
import {
	PLAY_CLICK,
	STEP_CLICK,
	MODE_CLICK,
	ON_TICK,
	ON_LOAD,
	DRUM_PANEL_CLICK,
	CONTROL_PANEL_CLICK
} from '../actionTypes'
import drumConfig from '../drumConfig'
import {stepKey, bufferKey} from '../helpers'
import initialState from '../initialState'
import drumBuffer from '../drumBuffer'

export default (state, {type, payload}) => {
	switch (type) {
		case DRUM_PANEL_CLICK:
			return state.set('showDrumPanel', !state.getIn(['showDrumPanel']))
		case CONTROL_PANEL_CLICK:
			return state.seT('showControlPanel', !state.get(['showControlPanel']))
		case STEP_CLICK: {
			const {type: drumType, step} = payload;
			let selector = ['steps', stepKey(drumType, step)];
			return state.setIn(selector, !state.getIn(selector));
		}
		case ON_TICK: {
			return state.set('currentStep', (state.getIn(['currentStep']) + 1) % TOTAL_STEPS);
		}
		case MODE_CLICK: {
			const mode = state.getIn(['mode'])
			if (mode === MATT_MODE) {
				return state.set('mode', TIANA_MODE)
			} else {
				return state.set('mode', MATT_MODE)
			}
		}
		case PLAY_CLICK: {
			return state.set('playing', !state.getIn(['playing']))
		}
		case ON_LOAD: {
			const {type: drumType, mode, buffer} = payload;
			const buffKey = bufferKey(drumType, mode)
			let newState = state.setIn(['drumBufferState', drumType, mode], buffKey);
			drumBuffer[buffKey] = buffer
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