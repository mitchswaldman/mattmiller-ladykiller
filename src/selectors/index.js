import createCachedSelector from 're-reselect'
import {createSelector} from 'reselect'
import {stepKey} from '../helpers'

export const getSteps = state => state.steps 
export const getCurrentStep = createSelector(
	(state) => state.currentStep,
	(currentStep) => currentStep
)

export const getStepButton = createCachedSelector(
	getSteps,
	(state, type, step, pattern) => stepKey(type, step, pattern),
	(steps, stepKey) => {						
		return steps[stepKey]
	}
)(
	(state, type, step) => stepKey(type, step)
)

export const getDrumControls = (state, type) => state.drumControlState[type]
export const getDrumPanel = state => state.showDrumPanel
export const getControlPanel = state => state.showControlsPanel
export const getCurrentPattern = state => state.currentPattern
export const getLoading = state => state.samplesLoaded

export const getChannelMuted = (state, type) => state.drumMuteState[type]