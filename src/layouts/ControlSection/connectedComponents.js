import React from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'
import {
	onModeClick, 
	onPlayClick,
	onTempoChange,
	onControlPanelClick
} from '../../actionCreators'
import {
	TIANA_MODE,
	MATT_MODE
} from '../../constants'
import Color from 'color'

const ShowHideControlPanel = ({handleClick, children}) => {
	return (
		<a onClick={handleClick}>
			{children}
		</a>
	)
}

const SwitchModeButton = ({mode, handleClick, children}) => {
	const wrapper = {
		height: '100%',
		width: '100%',
		position: 'relative'
	}

	const secondWrapper =  {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)'
	}

	const style = {
		height: '100%',
		borderRadius: '6px',
		width: '100%',
		overflow: 'wrap',
		fontSize: '1.5em',
		boxShadow: `
          inset 0px 1px 1px 0px rgba(250, 250, 250, .2), 
          inset 0px -4px 35px 0px rgba(0, 0, 0, .5)`,
		':focus': {
			border: 'none',
			outline: 'none'
		}
	}

	const mattStyle = {
		...style,
		backgroundColor: '#888',
	}

	const tianaStyle = {
		...style,
		backgroundColor: '#bbb',
		backgroundImage: `radial-gradient(
				${Color('white')} 0%,
				#faffbc 100%
			)`
	}

	const usedStyle = mode === MATT_MODE ? mattStyle : tianaStyle
	return (
		<div style={wrapper}>
			<div style={secondWrapper}>
				<button style={usedStyle} 
					onClick={handleClick}>
					{mode === MATT_MODE ? 'Engage Chanson Mode' : 'Disengage Chanson Mode'}
				</button>
			</div>
		</div>
)}

const PlayPauseButton = ({playing, handleClick}) => {
	const styles = {
		wrapper: {
			margin: '50px',
			position: 'relative'
		},
		secondWrapper: {
			width: '100%',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
		},
		button: {
			width: '100%',
			height: '100%',
			margin: '10px',
			border: 'none',
			outline: 'none',
			color: '#5C6D70'
		}
	}
	
	const getIcon = (playing) => {
		return playing ?  <i className="fas fa-pause"></i> : <i className="fas fa-play"></i> 
	}

	return (
		<div style={styles.wrapper}>
			<div style={styles.secondWrapper}>
				<button style={styles.button} onClick={handleClick}>
					<span style={!playing ? {display: 'none'} : {}}>
						<i className="fas fa-pause fa-5x"></i>
					</span>
					<span style={playing ? {display: 'none'} : {}}>
						<i className="fas fa-play fa-5x"></i>
					</span>

				</button>
			</div>
		</div>
	)
}

const TempoControl = ({tempo, handleChange}) => {
	const styles = {
		wrapper: {
			margin: '0 50px',
			position: 'relative',
			top: '50%',
			transform: 'translateY(-50%)'
		},
		secondWrapper: {
			width: '100%',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)'
		},
		labelWrapper: {
			textAlign: 'center',
			marginBottom: '15px'
		}
	}
	return (
		<div style={styles.wrapper}>
			<div style={styles.secondWrapper}>
				<div style={styles.labelWrapper}>
					{`Tempo ${tempo}BPM`}
				</div>
				<input value={tempo} onChange={handleChange} type='range' max='300' min='20' step='1'/>
			</div>
		</div>
	)
}

export const ConnectedSwitchModeButton = (() => {
	const mapStateToProps = (state) => ({
		mode: state.mode
	})

	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onModeClick())
	})
	return connect(mapStateToProps, mapDispatchToProps)(Radium(SwitchModeButton))
})()

export const ConnectedPlayButton = (() => {
	const mapStateToProps = (state) => ({
		playing: state.playing
	})

	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onPlayClick())
	})
	return connect(mapStateToProps, mapDispatchToProps)(Radium(PlayPauseButton))
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
	return connect(mapStateToProps, mapDispatchToProps)(Radium(TempoControl))
})()

export const ConnectedShowHideControlPanel = (() => {
	const mapDispatchToProps = (dispatch) => ({
		handleClick: () => dispatch(onControlPanelClick())
	})
	return connect(null, mapDispatchToProps)(ShowHideControlPanel)
})()