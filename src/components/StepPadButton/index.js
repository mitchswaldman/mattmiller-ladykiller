import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Color from 'color'
import {
	MUTE_COLOR,
	MUTE_SHADOW_COLOR
} from '../../constants'

const BORDER_RADIUS = '4px'

class StepPadButton extends React.Component {
	shouldComponentUpdate({on: nextOn, active: nextActive, muted: nextMuted}) {
		const {on, active, muted} = this.props 
		if((nextOn !== on) || (nextActive !== active) || (muted !== nextMuted)) {
			return true
		}
		return false
	}

	render() {
		const {
			active,
			on,
			muted,
			color,
			onClick} = this.props 


		const getRadialGradient = (hexString) => {
			const color = Color(hexString)
			return `radial-gradient(
				${Color('white')} 0%,
				#faffbc 100%
			)`
			if(color.dark()) {
				return `radial-gradient(
					${Color(color).hsl().saturate(.9).lighten(.8).string()} 0%, 
					${Color(color).hsl().saturate(.8).string()} 90%)`
			} else {
				return `radial-gradient(
				${Color(color).hsl().mix(Color('white'), 0.3).string()} 0%, 
				${Color(color).hsl().saturate(.9).string()} 40%, 
				${Color(color).hsl().saturate(.8).string()} 90%)`
			}
		}
		const baseStyle = {
			margin: 'auto',
			flex: 1,
			height: '100%',
			padding: '10px',
			boxShadow: `
				inset 0px 1px 1px 0px rgba(250, 250, 250, .2), 
				inset 0px -4px 50px 0px rgba(0, 0, 0, .5)`,
			borderRadius: BORDER_RADIUS,
			backgroundColor: Color(color).hsl().desaturate(.2).string(),
			':hover': {
				border	: 'none'
			},
			':focus': {
				border: 'none',
				outline: 'none'
			},
			':active': {
				border: 'none',
				outline: 'none'
			}
		}
		const onStyle = {
			...baseStyle,
			
			backgroundImage: getRadialGradient(color),
		}

		const activeStyle = {
			...baseStyle,
			backgroundColor: '#888'
		}

		const mutedStyle = {
			...baseStyle,
			backgroundImage: `radial-gradient(
					${MUTE_COLOR} 0%,
					${MUTE_SHADOW_COLOR} 100%
				)`
		}

		const usedStyle = muted ? mutedStyle : (on ? onStyle : (active ? activeStyle : baseStyle))
		return <button style={usedStyle}
					onClick={onClick}/>
	}
}

StepPadButton.propTypes = {
	// on means the user manually turned on this step pad
	on: PropTypes.bool.isRequired,
	// active means state.currentStep lines up with this stepPad.
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired
}

export default Radium(StepPadButton)