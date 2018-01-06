import Immutable from 'seamless-immutable'
import drumConfig from './drumConfig'
import drumControls from './drumControls'
import {stepKey} from './helpers'
import {
	MATT_MODE,
	TIANA_MODE,
	MODES,
	TOTAL_STEPS,
	TOTAL_PATTERNS
} from './constants'

const initialStepState = (() => {
	const steps = {}
	for(let step = 0; step < TOTAL_STEPS; step++) {
		for (let pattern = 0; pattern < TOTAL_PATTERNS; pattern++){
			drumConfig.forEach(({type}) => {
					const key = stepKey(type, step, pattern)
					steps[key] = false
				})
		}
	}
	return steps
})()

const initialDrumState = (() => {
	const drumState = {}
	drumConfig.forEach(({type}) => {
		drumState[type] = {}
		Object.keys(drumControls).forEach(control => {
			drumState[type][control] = drumControls[control]
		})
	})
	return drumState
})()

const drumBufferState = (() => {
	const bufferState = {}
	drumConfig.forEach(({type}) => {
		bufferState[type] = {}
		MODES.forEach(mode => {
			bufferState[type][mode] = null
		})
	})
	return bufferState
})()

const drumLoadingState = (() => {
	const loadingState = {}
	drumConfig.forEach(({type}) => {
		loadingState[type] = {}
		MODES.forEach(mode => {
			loadingState[type][mode] = false
		})
	})
})()

const drumMuteState = (() => {
	const muteState = {}
	drumConfig.forEach(({type}) => {
		muteState[type] = false
	})
	return muteState
})()

export default Immutable({
	steps: initialStepState,
	drumControlState: initialDrumState,
	drumBufferState: drumBufferState,
	drumLoadingState: drumLoadingState,
	drumMuteState: drumMuteState,
	drumConfig: drumConfig,

	playing: true,
	currentStep: 0,
	currentPattern: 0,
	tempo: 120,
	stepDivision: 0.25,
	mode: MATT_MODE,

	samplesLoading: false,
	totalSamplesLoaded: 0,

	// UI panel controls
	showDrumPanel: true,
	showControlsPanel: true
})