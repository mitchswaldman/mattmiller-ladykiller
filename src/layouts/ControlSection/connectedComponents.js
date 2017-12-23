import React from 'react'
import {connect} from 'react-redux'
import {
	onModeClick, 
	onPlayClick,
	onTempoChange,
	onControlPanelClick
} from '../../actionCreators'

const ShowHideControlPanel = ({handleClick, children}) => {
	return (
		<a onClick={handleClick}>
			{children}
		</a>
	)
}

const SwitchModeButton = ({mode, handleClick, children}) => {
	return (
	<button onClick={handleClick}>
		Switch Mode
	</button>
)}

const PlayPauseButton = ({playing, handleClick}) => {
	return (
		<button onClick={handleClick}>
			{playing ? 'Pause' : 'Play' }
		</button>
	)
}

const TempoControl = ({tempo, handleChange}) => {
	return (
		<input value={tempo} onChange={handleChange} type='range' max='300' min='20' step='1'/>
	)
}

export const ConnectedSwitchModeButton = (() => {
	const mapStateToProps = (state) => ({
		mode: state.mode
	})

	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onModeClick())
	})
	return connect(mapStateToProps, mapDispatchToProps)(SwitchModeButton)
})()

export const ConnectedPlayButton = (() => {
	const mapStateToProps = (state) => ({
		playing: state.playing
	})

	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onPlayClick())
	})
	return connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton)
})()

export const ConnectedTempoControl = (() => {
	const mapStateToProps = (state) => ({
		tempo: state.tempo
	})

	const mapDispatchToProps = (dispatch) => ({
		handleChange: (event) => {
			const target = event.target
			const value = target.value
			dispatch(onTempoChange(value))
		}
	})
	return connect(mapStateToProps, mapDispatchToProps)(TempoControl)
})()

export const ConnectedShowHideControlPanel = (() => {
	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onControlPanelClick())
	})
	return connect(null, mapDispatchToProps)(ShowHideControlPanel)
})()