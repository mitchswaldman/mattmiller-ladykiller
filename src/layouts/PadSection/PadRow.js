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
		type: PropTypes.string.isRequired
	}

	render() {
		return (
			<div>
				{[...Array(TOTAL_STEPS).keys()].map((stepIdx) => (
					<ConnectedStepPadButton type={this.props.type} step={stepIdx}/>		
					))}
			</div>
		)
	}
}

export default Radium(PadRow)