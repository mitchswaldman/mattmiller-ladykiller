import React from 'react'
import {getDrumControls} from '../../selectors'
import {connect} from 'react-redux'
import {
	onDrumControlChange
} from '../../actionCreators'

const DrumControl = ({control, params, handleChange}) => {
	return (
		<div>
			<label>{control}</label>
			<div>
				<input type='range'
					name={control}
					onChange={handleChange}
					max={params.max}
					min={params.min}
					step={params.step}
					value={params.value}/>
			</div>
		</div>
	)
}
const DrumControlPanel = ({label, drumControls, handleChange}) => {
	const onChange = (event) => {
		const {target} = event
		const {name, value} = target
		handleChange(name, value)
	}

	return (
		<div>
			<div>
				{label}
			</div>
			<div>
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