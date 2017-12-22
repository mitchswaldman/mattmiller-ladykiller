import {
	PLAY_CLICK,
	STEP_CLICK,
	ON_TICK,
	MODE_CLICK,
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

export const onModeClick = () => ({
	type: MODE_CLICK
})

export const onPlayClick = () => ({
	type: PLAY_CLICK
})