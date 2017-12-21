import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'
import {
	TOTAL_STEPS
} from '../../constants'
import drumConfig from '../../drumConfig'
import PadRow from './PadRow'


class PadSection extends React.Component {
	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired
	}

	render() {
		return (
			<div>
				{drumConfig.map(({type}) => (
					<PadRow type={type}/>
					))}
			</div>
		)
	}	
}

export default Radium(PadSection)