import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import {
	TOTAL_STEPS
} from '../../constants'
import {ConnectedStepPadButton} from './connectedComponents'

class PadRow extends React.Component {
	static propTypes = {
		// Drum Type
		type: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired
	}

	shouldComponentUpDate() {
		return false
	}
	
	render() {
		const {width, height} = this.props 
		const BUTTON_HEIGHT = height * 0.8;
		const BUTTON_WIDTH = width/16 * 0.9;
		const style = {
			width: '100%', height: '100%',
			display: 'flex',
		}
		return (
			<div style={style}>
				{[...Array(TOTAL_STEPS).keys()].map((stepIdx) => (
					<ConnectedStepPadButton key={stepIdx} 
					type={this.props.type} 
						step={stepIdx}
						color={this.props.color}
						/>		
					))}
			</div>
		)
	}
}

export default Radium(PadRow)