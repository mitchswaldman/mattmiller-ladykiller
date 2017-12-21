import Immutable from 'seamless-immutable'
import drumConfig from './drumConfig'
import {stepKey} from './helpers'
import {
	MATT_MODE,
	TIANA_MODE,
	MODES,
	TOTAL_STEPS
} from './constants'

const initialStepState = (() => {
	const steps = {}
	for(let step = 0; step < TOTAL_STEPS; step++) {
		drumConfig.forEach(({type}) => {
			const key = stepKey(type, step)
			steps[key] = false
		})
	}
	return steps
})()

const initialDrumState = (() => {
	const drumState = {}
	drumConfig.forEach(({type}) => {
		drumState[type] = {
			level: 75,
			length: 1.0,
			pitch: 1.0
		}
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
})

export default Immutable({
	steps: initialStepState,
	drumState: initialDrumState,
	drumBufferState: drumBufferState,
	drumLoadingState: drumLoadingState,
	drumConfig: drumConfig,

	playing: true,
	currentStep: 0,
	tempo: 120,
	stepDivision: 0.25,
	mode: MATT_MODE,

	samplesLoading: false,
	totalSamplesLoaded: 0,

	// UI panel controls
	showDrumPanel: false,
	showControlsPanel: false
})