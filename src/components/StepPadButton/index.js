import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Color from 'color'

class StepPadButton extends React.Component {
	render() {
		const {width, 
			height, 
			active,
			on,
			color} = this.props 

		const baseStyle = {
			width 	: width,
			height 	: height,
			borderRadius: '4px',
			color: Color(color).darken(.4).string(),
			':hover': {
				border	: `2px solid ${Color(color).darken(0.2).string()}`
			}
		}

		const onStyle = {
			...baseStyle,
			color: color
		}

		const activeStyle = {
			...baseStyle,
			color: Color(color).darken(.2).string()
		}

		return <button style={on ? onStyle : active ? active : baseStyle}/>
	}
}

StepPadButton.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	// on means the user manually turned on this step pad
	on: PropTypes.bool.isRequired,
	// active means state.currentStep lines up with this stepPad.
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	color: PropTypes.string.isRequired
}

export default Radium(StepPadButton)