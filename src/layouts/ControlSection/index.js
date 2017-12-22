import React from 'react'
import Radium from 'radium'
import {onModeClick, onPlayClick} from '../../actionCreators'
import {connect} from 'react-redux'

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

const ConnectedSwitchModeButton = (() => {
	const mapStateToProps = (state) => ({
		mode: state.mode
	})

	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onModeClick())
	})
	return connect(mapStateToProps, mapDispatchToProps)(SwitchModeButton)
})()

const ConnectedPlayButton = (() => {
	const mapStateToProps = (state) => ({
		playing: state.playing
	})

	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onPlayClick())
	})
	return connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton)
})()

class ControlSection extends React.Component {
	render() {
		const style = {
			flex: 1
		}
		return (
			<div style={style}>
				<ConnectedSwitchModeButton/>
				<ConnectedPlayButton />
			</div>)
	}
}

export default Radium(ControlSection)