import React from 'react'
import Radium from 'radium'
import PropTypes from 'prop-types'
import {
	TOTAL_STEPS
} from '../../constants'
import {ConnectedStepPadButton} from './connectedComponents'

class PadRow extends React.Component {
	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		// Drum Type
		type: PropTypes.string.isRequired,
		color: PropTypes.string.isRequired
	}

	render() {
		const {width, height} = this.props 
		const BUTTON_HEIGHT = height * 0.8;
		const BUTTON_WIDTH = width/16 * 0.9;
		return (
			<div>
				{[...Array(TOTAL_STEPS).keys()].map((stepIdx) => (
					<ConnectedStepPadButton key={stepIdx} 
					type={this.props.type} 
						step={stepIdx}
						height={BUTTON_HEIGHT}
						width={BUTTON_WIDTH}
						color={this.props.color}
						/>		
					))}
			</div>
		)
	}
}

export default Radium(PadRow)