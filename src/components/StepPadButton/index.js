import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Color from 'color'

const BORDER_RADIUS = '4px'

class StepPadButton extends React.Component {
	shouldComponentUpdate({on: nextOn, active: nextActive}) {
		const {on, active} = this.props 
		if((nextOn !== on) || (nextActive !== active)) {
			return true
		}
		return false
	}

	render() {
		const {
			active,
			on,
			color,
			onClick} = this.props 


		const baseStyle = {
			margin: 'auto',
			flex: 1,
			height: '100%',
			padding: '10px',
			borderRadius: BORDER_RADIUS,
			backgroundColor: Color(color).hsl().opaquer(.3).string(),
			':hover': {
				border	: `2px solid ${Color(color).hsl().darken(0.2).string()}`
			}
		}
		const onStyle = {
			...baseStyle,
			backgroundColor: '#000'
		}

		const activeStyle = {
			...baseStyle,
			backgroundColor: '#888'
		}
		const usedStyle = on ? onStyle : (active ? activeStyle : baseStyle)
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