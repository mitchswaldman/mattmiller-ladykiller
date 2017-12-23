import React from 'react'
import {getDrumControls} from '../../selectors'
import {connect} from 'react-redux'
import {
	onDrumControlChange
} from '../../actionCreators'
import Knob from '../../components/Knob'

const DrumControl = ({control, params, handleChange}) => {
	const onChange = (value) => {
		handleChange(control, value)
	}
	const style = {
		flex: 1
	}
	return (
		<div style={style}>
			<label>{control}</label>
			<div>
				<Knob type='range'
					name={control}
					onChange={onChange}
					max={params.max}
					min={params.min}
					step={params.step}
					value={params.value}
					width='50%'/>
			</div>
		</div>
	)
}
const DrumControlPanel = ({label, drumControls, handleChange}) => {
	const onChange = (control, value) => {
		handleChange(control, value)
	}
	const style = {
		display: 'flex'
	}
	return (
		<div >
			<div>
				{label}
			</div>
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