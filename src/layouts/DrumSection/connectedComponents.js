import React from 'react'
import {getDrumControls} from '../../selectors'
import {connect} from 'react-redux'
import {
	onDrumControlChange
} from '../../actionCreators'
import Knob from '../../components/Knob'

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
const DrumControlPanel = ({label, drumControls, handleChange}) => {
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