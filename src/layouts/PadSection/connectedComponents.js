import React from 'react'
import {connect} from 'react-redux'
import {onStepClick} from '../../actionCreators'
import {
	getStepButton, 
	getCurrentStep, 
	getChannelMuted,
	getCurrentPattern
} from '../../selectors'
import StepPadButton from '../../components/StepPadButton'

export const ConnectedStepPadButton = (() => {
	const mapStateToProps = (state, {type, step}) => ({
		active: getCurrentStep(state) === step,
		on: getStepButton(state, type, step, getCurrentPattern(state)),
		muted: getChannelMuted(state, type)
	})

	const mapDispatchToProps = (dispatch, {type, step}) => ({
		onClick: () => {
			dispatch(onStepClick(type, step))
		}
	})

	return connect(mapStateToProps, mapDispatchToProps)(StepPadButton)
})()