import {
	ON_PATTERN_CHANGE,
	MUTE_CLICK,
	DRUM_CONTROL_CHANGE,
	CONTROL_PANEL_CLICK,
	TEMPO_CHANGE,
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

export const onTempoChange = (tempo) => ({
	type: TEMPO_CHANGE,
	payload: {
		tempo
	}
})

export const onControlPanelClick = () => ({
	type: CONTROL_PANEL_CLICK
})

export const onDrumControlChange = (type, control, value) => ({
	type: DRUM_CONTROL_CHANGE,
	payload: {
		type, 
		control, 
		value
	}
})

export const onMuteClick = (type) => ({
	type: MUTE_CLICK,
	payload: {
		type
	}
})

export const onPatternChange = (pattern) => ({
	type: ON_PATTERN_CHANGE,
	payload: {
		pattern
	}
})