import React from 'react'
import Radium from 'radium'
import {getDrumControls} from '../../selectors'
import {connect} from 'react-redux'
import {
	onDrumControlChange,
	onMuteClick
} from '../../actionCreators'
import {
	getChannelMuted
} from '../../selectors'
import Knob from '../../components/Knob'
import Color from 'color'
import {
	MUTE_COLOR,
	MUTE_SHADOW_COLOR
} from '../../constants'

const MuteButton = ({muted, handleClick}) => {
	const styles = {
		muted: {
			backgroundImage: `radial-gradient(
				${MUTE_COLOR} 0%,
				${MUTE_SHADOW_COLOR} 100%
			)`
		},
		unmuted: {
			boxShadow: `
				inset 0px 1px 1px 0px rgba(250, 250, 250, .2), 
				inset 0px -4px 10px 0px rgba(0, 0, 0, .5)`,
			backgroundImage: `radial-gradient(
				${Color('white')} 0%,
				#faffbc 100%
			)`
		}
	}
	const usedStyle = muted ? styles.muted : styles.unmuted
	return (
		<div>
			<button onClick={handleClick} style={usedStyle}> M </button>
		</div>
	)
}

const DrumControl = ({control, params, handleChange}) => {
	const onChange = (e) => {
		const {target} = e 
		handleChange(control, target.value)
	}

	const MARGIN_SIDE = '5px'
	const style = {
		flex: 1,
		marginLeft: MARGIN_SIDE,
		marginRight: MARGIN_SIDE
	}
	const labelStyle = {
		margin: 'auto',
		textAlign: 'center'
	}

	const inputStyle = {
		maxWidth: '60px'
	}
	const controlToIcon = (control) => {
		switch(control) {
			case 'level':
				return <i className="fas fa-volume-up"></i>
			case 'pan':
				return <i className="fas fa-arrows-alt-h"></i>
			case 'speed':
				return <i className="far fa-clock"></i>
			default:
				return <i className="fas fa-align-justify"></i>
		}
	}
	return (
		<div style={style}>
			<div style={labelStyle}>
				{controlToIcon(control)}
			</div>
			<div className='range-slider'>
				<input 
					className='slider'
					type='range'
					name={control}
					onChange={onChange}
					max={params.max}
					min={params.min}
					step={params.step}
					value={params.value}
					/>
			</div>
		</div>
	)
}

const DrumControlPanel = ({label, type, drumControls, handleChange}) => {
	const onChange = (control, value) => {
		handleChange(control, value)
	}
	const style = {
		display: 'flex',
	}
	const absoluteStyle = {
		transform: 'translateY(50%)'
	}
	return (
				<div style={style}>
					{Object.keys(drumControls).map((control, idx) => {
						return (
							<DrumControl key={idx}
							control={control} 
							params={drumControls[control]}
							handleChange={onChange}/>
						)
					})}
					<ConnectedMuteButton type={type}/>
				</div>
	)
}

export const ConnectedDrumControlPanel = (() => {
	const mapStateToProps = (state, ownProps) => ({
		drumControls: getDrumControls(state, ownProps.type)
	})

	const mapDispatchToProps = (dispatch, ownProps) => ({
		handleChange: (control, value) => dispatch(onDrumControlChange(ownProps.type, control, value))
	})

	return connect(mapStateToProps, mapDispatchToProps)(DrumControlPanel)
})()

export const ConnectedMuteButton = (() => {
	const mapStateToProps = (state, ownProps) => ({
		muted: getChannelMuted(state, ownProps.type)
	})

	const mapDispatchToProps = (dispatch, ownProps) => ({
		handleClick: () => dispatch(onMuteClick(ownProps.type))
	})
	return connect(mapStateToProps, mapDispatchToProps)(Radium(MuteButton))
})()