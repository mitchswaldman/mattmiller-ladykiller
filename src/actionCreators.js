import {
	STEP_CLICK,
	ON_TICK,
	ON_LOAD
} from './actionTypes'

export const onTick = () => ({
	type: ON_TICK
})

export const onLoad = (type, mode, buffer) => ({
	type: ON_LOAD,
	payload: {
		type,
		mode,
		buffer
	}
})

export const onStepClick = (type, step) => ({
	type: STEP_CLICK,
	payload: {
		type,
		step
	}
})