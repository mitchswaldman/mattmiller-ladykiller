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
	(state, type, step)	=> stepKey(type, step),
	(steps, stepKey) => {
		return steps[stepKey]
	}
)(
	(state, type, step) => stepKey(type, step)
)
